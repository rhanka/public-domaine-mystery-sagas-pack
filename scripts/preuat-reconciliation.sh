#!/usr/bin/env bash
# Track B pre-UAT for graphify ontology studio --write.
#
# Starts the local studio in write mode on a loopback port with a fixed
# bearer token, applies one add_relation patch through the HTTP API, and
# verifies the patch hits:
# - the authoritative decisions log (graphify/reconciliation/decisions.jsonl)
# - the local audit log (.graphify/ontology/reconciliation/applied-patches.jsonl)
# - the .graphify/needs_update marker
#
# Re-uses the mock extraction + ontology produced by scripts/preuat-descriptions.sh
# (the mystery corpus exemplars: Sherlock Holmes, Dr. Watson, A Study in Scarlet).
#
# No LLM provider call. The script self-cleans on exit so it can be re-run
# safely. It tears down the studio process even on failure.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GRAPHIFY_REPO="${GRAPHIFY_REPO:-/home/antoinefa/src/graphify}"
CLI="$GRAPHIFY_REPO/dist/cli.js"
PORT=38918
TOKEN="preuat-walk-token-do-not-publish"
DECISIONS_PATH="$REPO_ROOT/graphify/reconciliation/decisions.jsonl"
AUDIT_PATH="$REPO_ROOT/.graphify/ontology/reconciliation/applied-patches.jsonl"
NEEDS_UPDATE="$REPO_ROOT/.graphify/needs_update"

cd "$REPO_ROOT"

if [ ! -f "$CLI" ]; then
    echo "ERROR: graphify CLI not found at $CLI (set GRAPHIFY_REPO env)" >&2
    exit 1
fi

# Make sure the ontology artifacts exist; preuat-descriptions.sh seeds them.
if [ ! -f .graphify/ontology/manifest.json ]; then
    echo "Running preuat-descriptions.sh to seed the ontology output..."
    ./scripts/preuat-descriptions.sh > /dev/null
fi

# Reset the authoritative decisions log and audit log so the test starts clean.
# decisions.jsonl is the committed empty placeholder.
: > "$DECISIONS_PATH"
rm -f "$AUDIT_PATH" "$NEEDS_UPDATE"

PROFILE_HASH=$(jq -r '.profile_hash' .graphify/ontology/manifest.json)
GRAPH_HASH=$(jq -r '.graph_hash' .graphify/ontology/manifest.json)

PATCH_PATH=".graphify/scratch/preuat-walk-patch.json"
mkdir -p .graphify/scratch
cat > "$PATCH_PATH" <<EOF
{
  "schema": "graphify_ontology_patch_v1",
  "id": "preuat-walk-001",
  "operation": "add_relation",
  "status": "proposed",
  "profile_hash": "$PROFILE_HASH",
  "graph_hash": "$GRAPH_HASH",
  "target": {
    "relation_type": "assists",
    "source_id": "character_dr_watson",
    "target_id": "character_sherlock_holmes"
  },
  "evidence_refs": ["corpus/sherlock-holmes/a-study-in-scarlet/text.txt#part 1"],
  "reason": "Watson assists Holmes throughout A Study in Scarlet.",
  "author": "preuat",
  "created_at": "2026-05-14T00:00:00.000Z"
}
EOF

echo "Starting ontology studio --write on 127.0.0.1:$PORT (token=$TOKEN)..."
node "$CLI" ontology studio \
    --config graphify.yaml \
    --host 127.0.0.1 \
    --port "$PORT" \
    --write \
    --token "$TOKEN" \
    > .graphify/scratch/studio.log 2>&1 &
STUDIO_PID=$!

cleanup() {
    if kill -0 "$STUDIO_PID" 2>/dev/null; then
        kill "$STUDIO_PID" 2>/dev/null || true
        wait "$STUDIO_PID" 2>/dev/null || true
    fi
    # Restore the committed empty placeholder so re-runs do not pollute git.
    : > "$DECISIONS_PATH"
    rm -f "$AUDIT_PATH" "$NEEDS_UPDATE"
}
trap cleanup EXIT

# Wait until the studio answers on the rebuild-status endpoint.
for _ in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf "http://127.0.0.1:$PORT/api/ontology/rebuild-status" > /dev/null 2>&1; then
        break
    fi
    sleep 0.5
done

# Step 1: validate (no mutation, no token still ok since we provide it).
VALIDATE=$(curl -sf -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary "@$PATCH_PATH" \
    "http://127.0.0.1:$PORT/api/ontology/patch/validate")
if [ "$(echo "$VALIDATE" | jq -r '.valid')" != "true" ]; then
    echo "FAIL: validate did not return valid=true" >&2
    echo "$VALIDATE" | jq . >&2 || true
    exit 1
fi

# Step 2: dry-run.
DRY_RUN=$(curl -sf -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary "@$PATCH_PATH" \
    "http://127.0.0.1:$PORT/api/ontology/patch/dry-run")
if [ "$(echo "$DRY_RUN" | jq -r '.dry_run')" != "true" ]; then
    echo "FAIL: dry-run did not return dry_run=true" >&2
    echo "$DRY_RUN" | jq . >&2 || true
    exit 1
fi
if [ -s "$DECISIONS_PATH" ]; then
    echo "FAIL: decisions log was modified by dry-run" >&2
    exit 1
fi

# Step 3: apply (writes to authoritative + audit + needs_update).
APPLY=$(curl -sf -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary "@$PATCH_PATH" \
    "http://127.0.0.1:$PORT/api/ontology/patch/apply")
if [ "$(echo "$APPLY" | jq -r '.valid')" != "true" ]; then
    echo "FAIL: apply returned valid=false" >&2
    echo "$APPLY" | jq . >&2 || true
    exit 1
fi
if [ "$(echo "$APPLY" | jq -r '.dry_run')" != "false" ]; then
    echo "FAIL: apply returned dry_run=true" >&2
    exit 1
fi

# Step 4: unauthorized POST should be rejected with 401.
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    --data-binary "@$PATCH_PATH" \
    "http://127.0.0.1:$PORT/api/ontology/patch/apply")
if [ "$HTTP_STATUS" != "401" ]; then
    echo "FAIL: unauthorized POST returned $HTTP_STATUS instead of 401" >&2
    exit 1
fi

# Step 5: assert side effects on disk.
if [ ! -s "$DECISIONS_PATH" ]; then
    echo "FAIL: authoritative decisions log was not appended" >&2
    exit 1
fi
DECISION_ID=$(tail -n 1 "$DECISIONS_PATH" | jq -r '.id')
DECISION_STATUS=$(tail -n 1 "$DECISIONS_PATH" | jq -r '.status')
if [ "$DECISION_ID" != "preuat-walk-001" ] || [ "$DECISION_STATUS" != "applied" ]; then
    echo "FAIL: unexpected decision record (id=$DECISION_ID status=$DECISION_STATUS)" >&2
    exit 1
fi

if [ ! -s "$AUDIT_PATH" ]; then
    echo "FAIL: audit log was not written" >&2
    exit 1
fi

if [ ! -f "$NEEDS_UPDATE" ]; then
    echo "FAIL: .graphify/needs_update marker missing after apply" >&2
    exit 1
fi

echo
echo "OK: studio --write end-to-end walk green."
echo "  Decision log:       $DECISIONS_PATH (last line id=$DECISION_ID status=$DECISION_STATUS)"
echo "  Audit log:          $AUDIT_PATH"
echo "  needs_update marker: $NEEDS_UPDATE"
echo "  Unauthorized POST returned HTTP 401 as expected."

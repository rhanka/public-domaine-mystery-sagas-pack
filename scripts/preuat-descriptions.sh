#!/usr/bin/env bash
# Track A pre-UAT for graphify wiki descriptions.
#
# Generates an ontology (with a tiny mock extraction over Sherlock Holmes
# corpus excerpts), then renders ontology entity wiki pages with a
# description sidecar index containing one validated `generated` paragraph
# (Sherlock Holmes) and one `insufficient_evidence` omission (Dr. Watson).
#
# Asserts:
# - Sherlock Holmes page contains the description block before Aliases.
# - Dr. Watson page does not contain the description block.
#
# No LLM provider call. No commit. Intended to be deleted after each run;
# safe to re-run.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GRAPHIFY_REPO="${GRAPHIFY_REPO:-/home/antoinefa/src/graphify}"
CLI="$GRAPHIFY_REPO/dist/cli.js"

cd "$REPO_ROOT"

if [ ! -f "$CLI" ]; then
    echo "ERROR: graphify CLI not found at $CLI (set GRAPHIFY_REPO env)" >&2
    exit 1
fi

if [ ! -f .graphify/profile/profile-state.json ]; then
    echo "Running profile dataprep..."
    node "$CLI" profile dataprep --config graphify.yaml --all
fi

mkdir -p .graphify/scratch

cat > .graphify/scratch/preuat-extraction.json <<'EOF'
{
  "input_tokens": 0,
  "output_tokens": 0,
  "nodes": [
    {"id": "character_sherlock_holmes", "label": "Sherlock Holmes", "type": "Character", "file_type": "document", "source_file": "corpus/sherlock-holmes/a-study-in-scarlet/text.txt", "source_location": "ch1", "confidence": "EXTRACTED", "status": "validated", "aliases": ["Mr. Holmes"]},
    {"id": "character_dr_watson", "label": "Dr. Watson", "type": "Character", "file_type": "document", "source_file": "corpus/sherlock-holmes/a-study-in-scarlet/text.txt", "source_location": "ch1", "confidence": "EXTRACTED", "status": "validated", "aliases": ["John H. Watson"]},
    {"id": "work_study_in_scarlet", "label": "A Study in Scarlet", "type": "Work", "file_type": "document", "source_file": "corpus/sherlock-holmes/a-study-in-scarlet/text.txt", "confidence": "EXTRACTED", "status": "validated"}
  ],
  "edges": [
    {"source": "character_sherlock_holmes", "target": "work_study_in_scarlet", "relation": "appears_in", "confidence": "EXTRACTED", "source_file": "corpus/sherlock-holmes/a-study-in-scarlet/text.txt"},
    {"source": "character_dr_watson", "target": "work_study_in_scarlet", "relation": "appears_in", "confidence": "EXTRACTED", "source_file": "corpus/sherlock-holmes/a-study-in-scarlet/text.txt"}
  ]
}
EOF

cat > .graphify/scratch/preuat-descriptions.json <<'EOF'
{
  "schema": "graphify_wiki_description_index_v1",
  "graph_hash": "preuat-graph-hash",
  "prompt_version": "wiki-description-v1",
  "nodes": {
    "character_sherlock_holmes": {
      "schema": "graphify_wiki_description_v1",
      "target_id": "character_sherlock_holmes",
      "target_kind": "node",
      "graph_hash": "preuat-graph-hash",
      "status": "generated",
      "description": "Sherlock Holmes is the consulting detective at the heart of A Study in Scarlet, partnered with Dr. Watson at 221B Baker Street.",
      "evidence_refs": ["corpus/sherlock-holmes/a-study-in-scarlet/text.txt#ch1"],
      "confidence": 0.9,
      "cache_key": "preuat-holmes",
      "generator": {"mode": "assistant", "provider": "assistant", "model": null, "prompt_version": "wiki-description-v1"}
    },
    "character_dr_watson": {
      "schema": "graphify_wiki_description_v1",
      "target_id": "character_dr_watson",
      "target_kind": "node",
      "graph_hash": "preuat-graph-hash",
      "status": "insufficient_evidence",
      "description": null,
      "evidence_refs": [],
      "confidence": null,
      "cache_key": "preuat-watson",
      "generator": {"mode": "assistant", "provider": "assistant", "model": null, "prompt_version": "wiki-description-v1"}
    }
  }
}
EOF

echo "Running ontology-output with descriptions..."
node "$CLI" profile ontology-output \
    --profile-state .graphify/profile/profile-state.json \
    --input .graphify/scratch/preuat-extraction.json \
    --out-dir .graphify/ontology \
    --descriptions .graphify/scratch/preuat-descriptions.json

HOLMES_PAGE=.graphify/ontology/wiki/entities/character_sherlock_holmes.md
WATSON_PAGE=.graphify/ontology/wiki/entities/character_dr_watson.md

if [ ! -f "$HOLMES_PAGE" ] || [ ! -f "$WATSON_PAGE" ]; then
    echo "FAIL: expected entity pages missing" >&2
    exit 1
fi

if ! grep -q "^## Description" "$HOLMES_PAGE"; then
    echo "FAIL: Holmes page does not contain the rendered description block" >&2
    exit 1
fi
if ! grep -q "consulting detective at the heart of A Study in Scarlet" "$HOLMES_PAGE"; then
    echo "FAIL: Holmes page is missing the expected description text" >&2
    exit 1
fi

if grep -q "^## Description" "$WATSON_PAGE"; then
    echo "FAIL: Watson page rendered a description despite insufficient_evidence" >&2
    exit 1
fi

echo
echo "OK: Holmes renders the generated description; Watson omits it."
echo "Holmes page: $REPO_ROOT/$HOLMES_PAGE"
echo "Watson page: $REPO_ROOT/$WATSON_PAGE"

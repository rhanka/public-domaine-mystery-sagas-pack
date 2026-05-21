# Graphify Ontology UAT (project-owned)

This directory holds **project-owned** ontology configuration consumed by
[`graphify.yaml`](../graphify.yaml). The committed [`.graphify/`](../.graphify)
directory is the generated documentary UAT export; everything under this
directory remains the authoritative source the user maintains.

## Files

- `ontology-profile.yaml` — node types, relation types, status policy,
  evidence policy, inference policy and ontology output settings for the
  curated mystery UAT. The current profile models pack metadata (`Saga`,
  `Author`, optional `Translator`) plus structural `part_of` links and
  curated case/evidence/method details across selected Holmes, Lupin,
  Father Brown, Thorndyke, and Raffles works.
- `reconciliation/decisions.jsonl` — append-only authoritative decision
  log. Starts empty; every applied `graphify_ontology_patch_v1` is
  appended here through `graphify ontology patch apply --write`.

## Running the UAT locally

```bash
cd ../public-domaine-mystery-sagas-pack
npm run graphify:deepen
graphify profile validate --config graphify.yaml
graphify profile dataprep --config graphify.yaml --all
graphify profile ontology-output \
  --profile-state .graphify/profile/profile-state.json \
  --input <extraction.json> \
  --out-dir .graphify/ontology
graphify ontology candidates \
  --profile-state .graphify/profile/profile-state.json \
  --out .graphify/ontology/reconciliation/candidates.json
```

The local studio (read-only by default) can be started with:

```bash
graphify ontology studio --config graphify.yaml --port 38917
```

## Conventions

- Generated files under `.graphify/profile/profile-state.json`,
  `.graphify/cache/`, `.graphify/needs_update`, `.graphify/branch.json`,
  `.graphify/worktree.json` and `.graphify/transcripts/` are runtime-local
  and are **not** committed (see top-level `.gitignore`).
- `decisions.jsonl` is append-only; do not edit it by hand. Patches go
  through `graphify ontology patch apply` so validation and audit are
  enforced.
- This UAT must remain generic configuration, not Graphify built-ins.
- `npm run graphify:deepen` enriches the checked-in semantic extraction.
  Widening the selected texts still requires adding seed semantic nodes
  for the new corpus paths before rerunning the Graphify export/profile
  steps.

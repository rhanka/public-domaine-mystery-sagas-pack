# Graphify Ontology UAT (project-owned)

This directory holds **project-owned** ontology configuration consumed by
[`graphify.yaml`](../graphify.yaml). The committed [`.graphify/`](../.graphify)
directory is the generated documentary UAT export; everything under this
directory remains the authoritative source the user maintains.

## Files

- `ontology-profile.yaml` — node types, relation types, status policy,
  evidence policy, inference policy and ontology output settings for the
  three-work mystery UAT (`A Study in Scarlet`, `The Adventures of
  Sherlock Holmes`, `Arsene Lupin, Gentleman-burglar`). The current
  profile also models pack metadata (`Saga`, `Author`, optional
  `Translator`) plus structural `part_of` links so the documentary graph
  is less shallow without widening the corpus scope.
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
- `npm run graphify:deepen` only enriches the checked-in semantic
  extraction. It does not widen the selected texts or re-include
  repository code.

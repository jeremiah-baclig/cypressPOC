#!/usr/bin/env bash
# find-scenario.sh - normalize branch name and locate scenario file under src/features
# Usage: ./find-scenario.sh <branch-name>

set -eu
BRANCH_RAW="$1"
BRANCH=$(echo "$BRANCH_RAW" | tr '[:upper:]' '[:lower:]' | sed -E 's#[/\s]+#-#g' | sed -E 's/[^a-z0-9._-]//g' | sed -E 's/^-+//; s/-+$//')
FEATURE_DIR="$(dirname "$0")/../features"
ATTEMPTED=()

# Attempt 1: exact match
CANDIDATE="$FEATURE_DIR/$BRANCH.md"
ATTEMPTED+=("$CANDIDATE")
if [ -f "$CANDIDATE" ]; then
  echo "$CANDIDATE"
  exit 0
fi

# Attempt 2: first segment
FIRST_SEGMENT=$(echo "$BRANCH" | cut -d- -f1)
CANDIDATE="$FEATURE_DIR/$FIRST_SEGMENT.md"
ATTEMPTED+=("$CANDIDATE")
if [ -f "$CANDIDATE" ]; then
  echo "$CANDIDATE"
  exit 0
fi

# Attempt 3: default
CANDIDATE="$FEATURE_DIR/main-scenario.md"
ATTEMPTED+=("$CANDIDATE")
if [ -f "$CANDIDATE" ]; then
  echo "$CANDIDATE"
  exit 0
fi

# Not found: write diagnostics
ARTIFACT_DIR="$(dirname "$0")/../playwright-mcp/artifacts"
mkdir -p "$ARTIFACT_DIR"
DIAG_FILE="$ARTIFACT_DIR/SCENARIO_NOT_FOUND.txt"
{
  echo "branch_raw: $BRANCH_RAW"
  echo "branch_normalized: $BRANCH"
  echo "attempted_paths:"
  for p in "${ATTEMPTED[@]}"; do
    echo "- $p"
  done
} > "$DIAG_FILE"

# exit non-zero so a workflow can detect the problem
echo "No scenario file found for branch '$BRANCH_RAW' (normalized: '$BRANCH'). Wrote $DIAG_FILE" >&2
exit 2

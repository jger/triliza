#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Smoke test: build (includes TypeScript check)"
npm run build

INDEX="out/index.html"
NEXT_ASSETS="out/_next"

for path in "$INDEX" "$NEXT_ASSETS"; do
  if [[ ! -e "$path" ]]; then
    echo "FAIL: missing $path after build"
    exit 1
  fi
done

echo "OK: smoke test passed ($INDEX, $NEXT_ASSETS)"

#!/usr/bin/env bash
# Publish out/ to the gh-pages branch. Replaces the gh-pages package (it pulled braces).
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -d out ]]; then
  echo "FAIL: out/ missing. Run npm run build first."
  exit 1
fi

REMOTE="$(git remote get-url origin)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -a out/. "$TMP/"
touch "$TMP/.nojekyll"

git -C "$TMP" init -b gh-pages
git -C "$TMP" add -A
git -C "$TMP" commit -m "deploy"
git -C "$TMP" push -f "$REMOTE" HEAD:gh-pages

echo "OK: deployed out/ to gh-pages"

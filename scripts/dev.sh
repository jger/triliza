#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}/triliza"

open_when_ready() {
  for _ in $(seq 1 120); do
    if curl -sf "$URL" >/dev/null 2>&1; then
      open "$URL"
      return
    fi
    sleep 0.25
  done
  echo "Dev server not ready; open ${URL} manually"
}

open_when_ready &
exec npm run dev -- -p "$PORT"

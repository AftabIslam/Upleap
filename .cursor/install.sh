#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Upleap bootstrap in ${ROOT}"

if [[ -f package.json ]]; then
  if [[ -f package-lock.json ]]; then
    npm ci
  elif [[ -f pnpm-lock.yaml ]] && command -v pnpm >/dev/null; then
    pnpm install --frozen-lockfile
  elif [[ -f bun.lockb ]] && command -v bun >/dev/null; then
    bun install --frozen-lockfile
  else
    npm install
  fi
fi

if [[ -f composer.json ]] && command -v composer >/dev/null; then
  composer install --no-interaction --prefer-dist
fi

if [[ -f requirements.txt ]]; then
  python3 -m pip install --user -r requirements.txt
fi

if [[ -f Gemfile ]]; then
  bundle install
fi

echo "Upleap bootstrap complete."

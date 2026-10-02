#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

start_dev_server() {
  local cmd="$1"
  local name="$2"
  if tmux has-session -t "$name" 2>/dev/null; then
    return 0
  fi
  tmux new-session -d -s "$name" "cd '$ROOT' && $cmd 2>&1 | tee /tmp/${name}.log"
}

if [[ -f package.json ]] && node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts.dev?0:1)" 2>/dev/null; then
  start_dev_server "npm run dev -- --host 0.0.0.0" "dev"
  exit 0
fi

if [[ -f manage.py ]]; then
  start_dev_server "python3 manage.py runserver 0.0.0.0:8000" "django"
  exit 0
fi

if [[ -f artisan ]]; then
  start_dev_server "php artisan serve --host=0.0.0.0 --port=8000" "laravel"
  exit 0
fi

echo "No application dev server configured yet (add package.json, manage.py, or artisan)."
exit 0

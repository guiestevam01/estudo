#!/usr/bin/env bash
# Faz backup automático apenas deste diretório, sem incluir mudanças de outros cursos.

set -Eeuo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd -- "$script_dir/.." && pwd)"
repo_dir="$(git -C "$project_dir" rev-parse --show-toplevel)"
project_path="$(git -C "$project_dir" rev-parse --show-prefix | sed 's:/$::')"
log_file="$project_dir/.auto-commit.log"
lock_file="${TMPDIR:-/tmp}/fundacao-auto-commit.lock"

if [[ -z "$project_path" ]]; then
  echo "O diretório do projeto precisa estar dentro de um repositório Git." >&2
  exit 1
fi

exec 9>"$lock_file"
if ! flock -n 9; then
  exit 0
fi

log() {
  printf '[%(%Y-%m-%d %H:%M:%S %z)T] %s\n' -1 "$*" >> "$log_file"
}

branch="$(git -C "$repo_dir" branch --show-current)"
if [[ -z "$branch" ]]; then
  log "Ignorado: HEAD destacado, sem branch para enviar."
  exit 0
fi

# Tenta enviar primeiro algum commit pendente de uma execução anterior.
if ! git -C "$repo_dir" push origin "$branch" >> "$log_file" 2>&1; then
  log "Envio pendente falhou; nenhuma mudança nova foi adicionada."
  exit 1
fi

git -C "$repo_dir" add -A -- "$project_path"

if git -C "$repo_dir" diff --cached --quiet -- "$project_path"; then
  log "Sem alterações em $project_path."
  exit 0
fi

if [[ "${DRY_RUN:-0}" == "1" ]]; then
  log "Simulação: haveria um commit para $project_path."
  git -C "$repo_dir" reset --quiet -- "$project_path"
  exit 0
fi

message="chore(fundacao): backup automático $(date '+%Y-%m-%d %H:%M')"
git -C "$repo_dir" commit -m "$message" -- "$project_path" >> "$log_file" 2>&1
git -C "$repo_dir" push origin "$branch" >> "$log_file" 2>&1
log "Commit automático enviado para origin/$branch."

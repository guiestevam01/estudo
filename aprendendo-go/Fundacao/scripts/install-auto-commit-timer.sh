#!/usr/bin/env bash
# Instala ou atualiza o timer systemd do usuário para este clone do projeto.

set -Eeuo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd -- "$script_dir/.." && pwd)"
unit_dir="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"

mkdir -p "$unit_dir"
sed "s|__PROJECT_DIR__|$project_dir|g" \
  "$project_dir/systemd/fundacao-auto-commit.service" \
  > "$unit_dir/fundacao-auto-commit.service"
install -m 0644 \
  "$project_dir/systemd/fundacao-auto-commit.timer" \
  "$unit_dir/fundacao-auto-commit.timer"

systemctl --user daemon-reload
systemctl --user enable --now fundacao-auto-commit.timer
systemctl --user list-timers fundacao-auto-commit.timer --all

#!/usr/bin/env bash
set -euo pipefail

# Deploy build folder ke VPS via rsync.
#
# Cara 1 — ketik password saat diminta:
#   bash push.sh
#
# Cara 2 — otomatis pakai sshpass (opsional):
#   brew trust mongodb/brew   # kalau brew error tap untrusted
#   brew install esolitos/ipa/sshpass
#   SSHPASS='password-vps' bash push.sh

HOST="${REMOTE_HOST:-168.231.118.186}"
USER="${REMOTE_USER:-root}"
PORT="${REMOTE_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/www/wwwroot/pradanaautocare.id}"
LOCAL_DIR="${LOCAL_DIR:-./pradanaautocare.id/}"

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Folder build belum ada: $LOCAL_DIR"
  echo "Jalankan dulu: pnpm build"
  exit 1
fi

if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
  RSYNC_SSH="sshpass -e ssh -p ${PORT} -o StrictHostKeyChecking=accept-new"
  echo ">> Auth: sshpass (env SSHPASS)"
else
  RSYNC_SSH="ssh -p ${PORT} -o StrictHostKeyChecking=accept-new"
  echo ">> Auth: SSH password prompt (ketik password VPS)"
fi

echo ">> Sync ${LOCAL_DIR} -> ${USER}@${HOST}:${REMOTE_DIR}"
rsync -avz --delete \
  -e "$RSYNC_SSH" \
  "$LOCAL_DIR" \
  "${USER}@${HOST}:${REMOTE_DIR}/"

echo ">> Deploy selesai."

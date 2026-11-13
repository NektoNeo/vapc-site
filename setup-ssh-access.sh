#!/usr/bin/env bash
set -euo pipefail

target=${1:-}
if [[ -z "$target" ]]; then
    read -rp 'SSH destination (user@host or SSH config alias): ' target
fi
if [[ -z "$target" || "$target" == -* || "$target" =~ [[:space:]] ]]; then
    echo 'Supply a single SSH destination.' >&2
    exit 1
fi
key=${2:-"$HOME/.ssh/id_ed25519.pub"}
if [[ $# -lt 2 && ! -f "$key" ]]; then
    key="$HOME/.ssh/id_rsa.pub"
fi
if [[ "$key" != *.pub || ! -f "$key" ]]; then
    echo 'Choose an existing public (.pub) key file.' >&2
    exit 1
fi
ssh-keygen -lf "$key" >/dev/null
ssh-copy-id -i "$key" "$target"
echo 'Keep your current session open. Verify a new key-only login in a separate window.'

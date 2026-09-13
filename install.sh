#!/usr/bin/env bash
set -euo pipefail

echo "================================================="
echo " Installation des dépendances pour DINUM Setup"
echo "================================================="

# Détection de l'accès root / sudo
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    if command -v sudo >/dev/null 2>&1; then
        SUDO="sudo"
    else
        echo "Erreur: Ce script nécessite les droits root ou 'sudo'." >&2
        exit 1
    fi
fi

# 1. Mise à jour et paquets de base
echo "[1/5] Installation des paquets système (git, make, curl, etc.)..."
$SUDO apt-get update -y
$SUDO apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    make \
    jq

# 2. Configuration du dépôt officiel Docker
echo "[2/5] Configuration du dépôt Docker officiel..."
$SUDO mkdir -p /etc/apt/keyrings
if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/debian/gpg | $SUDO gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
fi

DISTRO_CODENAME="$(lsb_release -cs 2>/dev/null || (grep VERSION_CODENAME /etc/os-release 2>/dev/null | cut -d= -f2) || echo "bookworm")"
ARCH="$(dpkg --print-architecture)"

if [ ! -f /etc/apt/sources.list.d/docker.list ]; then
    echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian ${DISTRO_CODENAME} stable" | $SUDO tee /etc/apt/sources.list.d/docker.list > /dev/null
    $SUDO apt-get update -y
fi

# 3. Installation des plugins Docker (Compose v2 & Buildx)
echo "[3/5] Installation des plugins Docker (Buildx & Compose v2)..."
$SUDO apt-get install -y \
    docker-compose-plugin \
    docker-buildx-plugin

# Assurer la compatibilité des répertoires de plugins CLI Docker
$SUDO mkdir -p /usr/lib/docker/cli-plugins /usr/local/lib/docker/cli-plugins
if [ -d /usr/libexec/docker/cli-plugins ]; then
    for plugin in /usr/libexec/docker/cli-plugins/*; do
        if [ -e "$plugin" ]; then
            $SUDO ln -sf "$plugin" /usr/lib/docker/cli-plugins/
            $SUDO ln -sf "$plugin" /usr/local/lib/docker/cli-plugins/
        fi
    done
fi

# 4. Configuration de /etc/hosts pour auth.local
echo "[4/5] Configuration des hôtes locaux (/etc/hosts)..."
if ! grep -q "auth.local" /etc/hosts; then
    echo "Ajout de '127.0.0.1 auth.local' dans /etc/hosts..."
    echo "127.0.0.1 auth.local" | $SUDO tee -a /etc/hosts > /dev/null
else
    echo "Entrée 'auth.local' déjà configurée."
fi

# 5. Vérification des outils
echo "[5/5] Vérification finale des prérequis..."
echo -n "• Git: " && git --version
echo -n "• Make: " && make --version | head -n 1
echo -n "• Docker: " && docker --version
echo -n "• Docker Compose: " && docker compose version
echo -n "• Docker Buildx: " && docker buildx version

echo ""
echo "================================================="
echo " ✅ Installation terminée avec succès !"
echo " Vous pouvez maintenant exécuter :"
echo "   make bootstrap"
echo "================================================="

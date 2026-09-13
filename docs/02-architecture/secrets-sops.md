---
title: Gestion des Secrets (SOPS & age)
description: Guide de gestion et de chiffrement des secrets de configuration avec SOPS et age pour La Suite numérique.
---

Dans l'écosystème de **La Suite numérique**, la gestion des secrets respecte le principe **GitOps** : les fichiers de configuration contenant des informations sensibles (mots de passe de production, clés API de staging, certificats) sont versionnés directement dans Git sous forme chiffrée grâce à l'outil **SOPS** (Secrets OPerationS de Mozilla) et à l'algorithme de chiffrement asymétrique moderne **age**.

---

## 💡 Différence entre Dev Local et Déploiement

- **En développement local (`dinum-setup`) :**
  Vous utilisez des fichiers `.local` (ex: `common.local`, `postgresql.local`) contenant des clés de test générées automatiquement par `make env`. **Aucune clé SOPS n'est requise pour faire tourner la stack de développement local.**
- **En environnement de staging / production / CI :**
  Les valeurs réelles sont stockées dans des fichiers chiffrés (`.enc.env`, `secrets.enc.yaml`) et déchiffrées au déploiement via une clé privée `age`.

---

## 🛠️ 1. Installation des Outils

### Sur Debian / Ubuntu :

```bash
# 1. Installer age
sudo apt-get install -y age

# 2. Installer SOPS (dernière version binaire)
SOPS_VERSION="v3.9.4"
sudo curl -fsSL "https://github.com/getsops/sops/releases/download/${SOPS_VERSION}/sops-${SOPS_VERSION}.linux.amd64" -o /usr/local/bin/sops
sudo chmod +x /usr/local/bin/sops
```

### Sur macOS :

```bash
brew install sops age
```

---

## 🔑 2. Fonctionnement du Chiffrement avec age

Le fichier `.sops.yaml` présent à la racine des dépôts définit les clés publiques des membres autorisés de l'équipe :

```yaml title=".sops.yaml"
creation_rules:
  - path_regex: ./*
    key_groups:
      - age:
          - age15fyxdwmg5mvldtqqus87xspuws2u0cpvwheehrtvkexj4tnsqqysw6re2x # Mainteneur 1
          - age16hnlml8yv4ynwy0seer57g8qww075crd0g7nsundz3pj4wk7m3vqftszg7 # CI / GitHub Actions
```

### Configuration de votre clé privée locale

Pour permettre à SOPS de déchiffrer les fichiers, vous devez exporter la variable d'environnement `SOPS_AGE_KEY_FILE` pointant vers votre clé privée :

```bash
export SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt
```

---

## 📜 3. Commandes Utiles au Quotidien

### Déchiffrer et afficher un fichier :

```bash
sops -d env.d/staging/common.enc
```

### Éditer un fichier chiffré (déchiffre temporairement dans votre éditeur) :

```bash
sops env.d/staging/common.enc
```

### Chiffrer un nouveau fichier d'environnement :

```bash
sops --encrypt --in-place env.d/staging/new_secrets.env
```

### Mettre à jour les clés des destinataires (re-chiffrer pour tous les membres) :

```bash
sops updatekeys env.d/staging/common.enc
```

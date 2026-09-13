---
title: Authentification & SSO
description: Fonctionnement de l'authentification partagée, OpenID Connect (OIDC) et Keycloak en environnement local.
---

Dans La Suite numérique, l'authentification est mutualisée et repose sur le protocole standard **OpenID Connect (OIDC)**, orchestré en développement par une instance locale **Keycloak** (ou ProConnect / AgentConnect en environnement cible).

---

## 🛡️ Règle d'Or en Développement

> **Important :** Ne désactivez pas et ne supprimez pas les couches d'authentification dans le code applicatif.

Le chemin recommandé et éprouvé est de faire tourner l'authentification réelle en local avec :

1. Une instance Keycloak locale pré-configurée.
2. Des utilisateurs de test (fixtures ou comptes de seed) créés automatiquement lors du bootstrap.
3. Les redirections OIDC configurées sur `localhost` ou `auth.local`.

---

## 🌐 Configuration `/etc/hosts`

Pour permettre la résolution correcte des domaines OIDC partagés entre votre navigateur (machine hôte) et les conteneurs Docker, l'entrée suivante doit être présente dans `/etc/hosts` :

```text
127.0.0.1 auth.local
```

Cette configuration est appliquée automatiquement lors de l'exécution de `make install` (ou manuellement avec `echo "127.0.0.1 auth.local" | sudo tee -a /etc/hosts`).

---

## 👤 Comptes de Test Pré-configurés

Lors de l'initialisation des projets avec `make bootstrap`, les comptes de test suivants sont immédiatement utilisables :

| Projet        | Service         | Identifiant             | Mot de Passe | Rôle                                                 |
| ------------- | --------------- | ----------------------- | ------------ | ---------------------------------------------------- |
| **Docs**      | Interface Web   | `impress`               | `impress`    | Utilisateur standard (pas besoin de créer de compte) |
| **Docs**      | Django Admin    | `admin`                 | `admin`      | Administrateur des modèles                           |
| **Keycloak**  | Console d'Admin | `admin`                 | `admin`      | Administrateur du Realm OIDC                         |
| **Transfers** | Interface Web   | `agent@collectivite.fr` | `transferts` | Utilisateur test collectivité                        |
| **Transfers** | Keycloak        | `admin`                 | `admin`      | Administrateur OIDC local                            |
| **Accounts**  | Interface Web   | `accounts`              | `accounts`   | Utilisateur test                                     |
| **People**    | Django Admin    | `admin`                 | `admin`      | Administrateur annuaire                              |

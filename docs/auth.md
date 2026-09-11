---
title: Authentification
description: Fonctionnement de l'authentification et OIDC en environnement de développement local.
---

# Authentification en développement

Dans La Suite numérique, l'authentification est mutualisée et repose sur le protocole **OpenID Connect (OIDC)**, le plus souvent orchestré par une instance **Keycloak** ou un fournisseur d'identité compatible (ex: ProConnect / AgentConnect).

## Règle d'or en développement

> **Important :** Ne supprimez pas et ne désactivez pas les couches d'authentification dans le code applicatif.

Le chemin recommandé est de faire tourner l'authentification réelle en local avec :
1. Une instance Keycloak locale ou simulée.
2. Des utilisateurs de test (fixtures ou comptes de seed) pré-configurés.
3. Les redirections OIDC locales configurées sur `localhost` ou `auth.local`.

## Configuration `/etc/hosts`

Pour permettre la résolution correcte des domaines OIDC partagés entre le navigateur et les conteneurs Docker, il est nécessaire d'ajouter l'alias suivant dans votre fichier `/etc/hosts` :

```text
127.0.0.1 auth.local
```

Pour l'ajouter sous macOS ou Linux :

```bash
echo "127.0.0.1 auth.local" | sudo tee -a /etc/hosts
```

## Comptes de test

Lors du `make bootstrap` des projets supportés, des utilisateurs de test sont généralement créés automatiquement :
- Utilisateur standard : permet de tester les flux utilisateurs nominaux.
- Super-utilisateur / Administrateur : permet d'accéder aux consoles d'administration (ex: Django Admin, Keycloak Admin Console).

Pour plus de détails sur les identifiants spécifiques à chaque composant, référez-vous à la page dédiée du projet concerné dans la section **Projets**.

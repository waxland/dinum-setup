

Pour soumettre la **PR 1** (`01-docs-serveur-config.md`) au dépôt officiel de la DINUM ([`suitenumerique/docs`](https://github.com/suitenumerique/docs)), voici la marche à suivre pas à pas :

---

### Étape 1 : Forker le dépôt officiel sur GitHub
1. Rendez-vous sur [https://github.com/suitenumerique/docs](https://github.com/suitenumerique/docs).
2. Cliquez sur le bouton **Fork** (en haut à droite) pour créer une copie sous votre compte (`waxland/docs`).

---

### Étape 2 : Cloner votre fork et créer la branche
Dans votre terminal :

```bash
# 1. Cloner votre fork
git clone git@github.com:waxland/docs.git docs-upstream
cd docs-upstream

# 2. Configurer le remote upstream officiel
git remote add upstream https://github.com/suitenumerique/docs.git
git fetch upstream

# 3. Créer la branche de fonctionnalité
git checkout -b feature/remote-server-support
```

---

### Étape 3 : Appliquer les modifications

Les modifications portent sur 3 fichiers :

#### 1. `compose.yml`
Remplacer la valeur en dur de `API_ORIGIN` :
```yaml
      args:
        API_ORIGIN: "${API_ORIGIN:-http://localhost:8071}"
        PUBLISH_AS_MIT: "false"
        SW_DEACTIVATED: "true"
```

#### 2. `compose-e2e.yml`
Remplacer également la valeur :
```yaml
      args:
        API_ORIGIN: "${API_ORIGIN:-http://localhost:8071}"
        PUBLISH_AS_MIT: "false"
        SW_DEACTIVATED: "true"
```

#### 3. `src/frontend/apps/impress/next.config.js`
Rendre `allowedDevOrigins` dynamique :
```javascript
const nextConfig = {
  allowedDevOrigins: ['docs.127.0.0.1.nip.io', process.env.ALLOWED_DEV_ORIGIN].filter(Boolean),
  output: 'export',
  trailingSlash: true,
```

---

### Étape 4 : Commiter et pousser sur votre fork

```bash
# Ajouter les fichiers modifiés
git add compose.yml compose-e2e.yml src/frontend/apps/impress/next.config.js

# Commiter avec le message conventionnel
git commit -m "feat(dev): make development URLs configurable for remote servers and VMs"

# Pousser la branche sur votre fork
git push -u origin feature/remote-server-support
```

---

### Étape 5 : Ouvrir la Pull Request

1. Rendez-vous sur votre fork : `https://github.com/waxland/docs`.
2. GitHub vous affichera un bouton **"Compare & pull request"**.
3. Remplissez le formulaire :
   - **Base repository :** `suitenumerique/docs` (branche `main`)
   - **Head repository :** `waxland/docs` (branche `feature/remote-server-support`)
   - **Title :**
     ```text
     feat(dev): make development URLs configurable for remote servers and cloud VMs
     ```
   - **Description :** Copiez-collez le contenu de votre fichier `01-docs-serveur-config.md` (sections *Contexte*, *Diff Git*, et *Validation*).
4. Cliquez sur **"Create pull request"**.
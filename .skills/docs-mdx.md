---
title: Rédaction de Documentation Technique (MDX & Zudoku)
sidebar_label: Docs MDX
description: Normes de rédaction MDX dans Zudoku, proscription des doublons de titres H1, utilisation obligatoire du composant interactif Mermaid et composants dynamiques (CodeTabs, DocHeaderSummary).
---

Ce skill définit les règles fondamentales, les standards stylistiques et les bonnes pratiques pour rédiger et maintenir une documentation technique claire, interactive et sans défaut de rendu dans l'écosystème **Zudoku (Vite SSR + MDX)**.

---

## 1. Quand l'utiliser

- Création, mise à jour ou refactorisation de pages de documentation dans `documentation/docs/fr/` ou `documentation/docs/en/`.
- Ajout ou modification de composants React interactifs dans `documentation/src/components/`.
- Harmonisation des titres, de la coloration syntaxique et des diagrammes d'architecture.
- Résolution des avertissements et erreurs de compilation Zudoku SSR ou de mismatch d'hydratation.

---

## 2. Règles Fondamentales & Standards de Style MDX

### 🛑 Règle 1 : Zéro Doublon de Titre H1 (Frontmatter vs Titre Markdown)
- **Principe :** Zudoku génère automatiquement le titre principal `<h1>` à partir de la propriété `title` du frontmatter YAML.
- **Interdiction :** Ne **JAMAIS** ajouter un `# Titre de la page` (H1 Markdown) au début du texte après le frontmatter.
- **Bonne Pratique :**
  ```mdx
  ---
  title: Guide d'Architecture & Flux
  sidebar_label: Architecture
  description: Description concise de la page pour le SEO et le moteur de recherche.
  ---

  <!-- ✅ Pas de "# Titre" ici ! Démarrez directement avec l'introduction ou <DocHeaderSummary> -->
  <DocHeaderSummary
    readingTime="5 min"
    level="Intermédiaire"
    roles={["Frontend", "Backend"]}
    prerequisites={["Docker", "Node.js 22+"]}
    status="Production Ready"
    takeaway="Architecture modulaire découpée en 3 tiers avec cache Redis."
  />

  ## 🏛️ 1. Vue d'Ensemble
  ```

---

### 🎨 Règle 2 : Utilisation Obligatoire du Composant `<Mermaid>` (Zéro Code-Block Brut)
- **Principe :** Ne **JAMAIS** utiliser de simple bloc de code Markdown brut (```` ```mermaid ````) dans les pages `.mdx`.
- **Pourquoi :** Le composant interactif `<Mermaid chart={`...`} />` apporte :
  1. Le **mode plein écran immersif** avec zoom, pan et fermeture au clavier (<kbd>Échap</kbd>).
  2. L'adaptation dynamique aux thèmes clair et sombre avec la palette officielle de l'État (`#000091`, `#f5f5fe`).
  3. L'absence de flash ou de décalage de layout (CLS) lors du rendu SSR.
- **Bonne Pratique :**
  ```mdx
  <Mermaid chart={`flowchart TD
      Client["Éditeur BlockNote"] --> SDK["@suitenumerique/slash-sources-sdk"]
      SDK --> Backend["django-lasuite-sources"]
      Backend --> API["APIs Souveraines"]
  `} />
  ```

---

### 📦 Règle 3 : Systématisation des Onglets Dynamiques (`<CodeTabs>`)
Pour toute commande d'installation ou comparatif de code, proscrire les listings statiques séparés et utiliser les composants prévus :

1. **Installation de packages JavaScript/TypeScript :**
   ```mdx
   <PackageInstallTabs packages="@suitenumerique/slash-sources-sdk @suitenumerique/blocknote-sources" />
   ```
2. **Installation d'environnements Python :**
   ```mdx
   <PythonInstallTabs packages="django-lasuite-sources" />
   ```
3. **Comparatif d'implémentation TypeScript $\leftrightarrow$ Python :**
   ```mdx
   <DualLanguageTabs
     tsTitle="Frontend BlockNote"
     pyTitle="Backend Django"
     tsCode={`const source = defineSourceProvider({ ... });`}
     pyCode={`class SourceProvider(BaseSourceProvider): ...`}
   />
   ```

---

### 🛡️ Règle 4 : Pureté JSX & Prévention des Erreurs d'Hydratation
- ⚠️ **Balises auto-fermantes :** Toutes les balises HTML dans le MDX doivent être explicitement fermées (ex : `<br />`, `<hr />`, `<img ... />`).
- **Pas de blocs HTML avec lignes vides imbriquées :** Ne pas insérer de blocs `<div>` contenant des paragraphes séparés par des sauts de ligne non parsés (cause de l'erreur React `cannot appear as a descendant of <p>`).
- Privilégier les composants réutilisables : `<FeatureGrid cols={3}>`, `<FeatureCard ... />`, `<Kanban />`, `<LawSlashPreview />`.

---

## 3. Structure Standardisée d'une Fiche Documentaire

Toute nouvelle page doit respecter le schéma type suivant :

1. **Frontmatter YAML :** `title`, `sidebar_label`, `description`.
2. **En-tête de Synthèse :** `<DocHeaderSummary>` (temps de lecture, niveau, rôles cibles, prérequis, résumé).
3. **Corps Structuré :**
   - `## 1. Contexte & Problématique Métier`
   - `## 2. Architecture & Diagramme Interactif (<Mermaid>)`
   - `## 3. Installation & Configuration (<PackageInstallTabs>)`
   - `## 4. Implémentation & Code (<CodeTabs> ou <DualLanguageTabs>)`
   - `## 5. Validation & Tests Automatisés`

---

## 4. Procédure de Validation Locale

Avant de finaliser toute modification :

```bash
# 1. Régénérer la navigation automatique Zudoku
npm run docs:nav

# 2. Compiler en SSR et vérifier 0 erreur d'hydratation et 0 warning de syntaxe
npm run docs:build
```

---

## 5. Livrable & Critères d'Acceptation

- [ ] 0 doublon de titre H1 (le titre provient uniquement du frontmatter).
- [ ] 100% des diagrammes Mermaid encapsulés dans `<Mermaid chart={`...`} />`.
- [ ] Commandes d'installation encapsulées dans `<PackageInstallTabs>` ou `<PythonInstallTabs>`.
- [ ] Rendu SSR validé avec `npm run docs:build` sans aucune erreur.

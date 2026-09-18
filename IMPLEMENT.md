Read 

Voici le contenu complet et structuré de la feuille de route d'implémentation à coller dans votre fichier ouvert `IMPLEMENT.md` :

```markdown
# 📋 Plan d'Implémentation & Refonte : Démo I18n, Routing `/fr` / `/en`, Architecture Modulaire & Style Sobre

> **Objectif :** Intégrer l'internationalisation FR/EN synchronisée avec l'URL (`/fr`, `/en`), découper le code en sous-composants modulaires et appliquer une charte graphique ultra-sobre (inspirée des standards DINUM / beta.gouv.fr : zéro effet flashy, zéro couleur superflue, conformité RGAA v4.1 AA).

---

## 🏗️ 1. Architecture des Fichiers Cibles

```text
demo/
├── src/C
│   ├── components/
│   │   ├── Header.tsx           # Navbar sobre avec sélecteur de langue, liens doc/github & switch thème
│   │   ├── Hero.tsx             # Titre, badge, sélecteur de pays/registre et raccourcis d'insertion
│   │   ├── Footer.tsx           # Mentions légales, conformité RGAA v4.1 AA, licence
│   │   └── index.ts             # Barrel export des composants UI
│   ├── hooks/
│   │   └── useLocaleRouter.ts   # Synchronisation de l'état avec window.location (/fr <-> /en)
│   ├── i18n/
│   │   ├── types.ts             # Typage strict DemoLocale et DemoTranslations
│   │   ├── fr.ts                # Traductions françaises
│   │   ├── en.ts                # Traductions anglaises
│   │   └── index.ts             # Accesseur getDemoTranslations(locale)
│   ├── App.tsx                  # Orchestrateur racine épuré
│   ├── demo.css                 # Feuille de styles minimaliste et accessible
│   ├── main.tsx                 # Point d'entrée React 19
│   └── presets.config.ts        # Métadonnées des connecteurs souverains par pays
```

---

## 📝 2. Liste des Tâches (TODO Checklist)

### Phase 1 : Système I18n & Typage Strict
- [ ] **T-101** : Créer `demo/src/i18n/types.ts` définissant les interfaces `DemoLocale` (`'fr' | 'en'`) et `DemoTranslations`.
- [ ] **T-102** : Créer `demo/src/i18n/fr.ts` contenant l'ensemble des libellés en français.
- [ ] **T-103** : Créer `demo/src/i18n/en.ts` contenant l'ensemble des libellés en anglais.
- [ ] **T-104** : Créer `demo/src/i18n/index.ts` avec le sélecteur `getDemoTranslations(locale)`.

### Phase 2 : Hook de Routage URL `/fr` & `/en`
- [ ] **T-201** : Créer `demo/src/hooks/useLocaleRouter.ts` gérant la détection du chemin d'URL initial, l'écoute des événements `popstate` et la mise à jour sans rechargement (`history.pushState`).

### Phase 3 : Découpage en Sous-Composants Épurés
- [ ] **T-301** : Créer `demo/src/components/Header.tsx` :
  - Intégrer un `<select id="language-select">` accessible avec étiquette explicite (`sr-only`).
  - Proposer les liens de documentation et dépôt sans animations excessives.
  - Bouton de bascule de thème clair/sombre.
- [ ] **T-302** : Créer `demo/src/components/Hero.tsx` :
  - Badge discret et typographie sobre.
  - Sélecteur de registres souverains (`FR`, `DE`, `NL`, `ES`, `EU`, `CA`).
  - Barres de boutons d'insertion rapide typés.
- [ ] **T-303** : Créer `demo/src/components/Footer.tsx` (mentions DINUM / RGAA / MIT).
- [ ] **T-304** : Créer `demo/src/components/index.ts`.

### Phase 4 : Refonte Graphique & Règle de Sobriété
- [ ] **T-401** : Remplacer `demo.css` par une feuille de style minimaliste :
  - Zéro effet de dégradé ou ombre agressive.
  - Couleurs d'accentuation limitées aux tokens officiels (`--blue-france: #000091`, `--danger: #ce0500`).
  - Suppression des transitions et hovers superflus.
  - Contraste typographique $\ge 4.5:1$ et indicateurs de focus visibles (`:focus-visible`).

### Phase 5 : Assemblage dans `App.tsx` & Validation
- [ ] **T-501** : Refactoriser `App.tsx` en assemblant `Header`, `Hero`, `BlockNoteView` et `Footer`.
- [ ] **T-502** : Vérifier le typage TypeScript (`npm --prefix demo run typecheck`).
- [ ] **T-503** : Valider le build de production (`npm --prefix demo run build`).
- [ ] **T-504** : Vérifier les tests end-to-end (`npm --prefix packages/blocknote-sources run test:e2e`).
- [ ] **T-505** : Déployer et vérifier le rendu sur Vercel.

---

## 💻 3. Code des Fichiers Prêts à Déployer

### `demo/src/i18n/types.ts`
```typescript
export type DemoLocale = 'fr' | 'en';

export interface DemoTranslations {
  nav: {
    title: string;
    documentation: string;
    github: string;
    themeLight: string;
    themeDark: string;
    reset: string;
    selectLanguage: string;
  };
  hero: {
    tag: string;
    title: string;
    description: string;
    countryLabel: string;
    quickInsertLabel: string;
  };
  editor: {
    initialTitlePrefix: string;
    initialTitleSuffix: string;
    instructionBlock: string;
    instructionInline: string;
    interlinkExample: string;
    consultation: string;
    slashGroupTitle: string;
    emptySearchPlaceholder: string;
    datasetLoaded: string;
  };
  footer: {
    entity: string;
    compliance: string;
  };
}
```

### `demo/src/i18n/fr.ts`
```typescript
import { DemoTranslations } from './types';

export const frTranslations: DemoTranslations = {
  nav: {
    title: 'Docs',
    documentation: 'Documentation',
    github: 'GitHub',
    themeLight: 'Thème clair',
    themeDark: 'Thème sombre',
    reset: 'Réinitialiser',
    selectLanguage: 'Langue de l’interface',
  },
  hero: {
    tag: 'Démonstrateur Officiel',
    title: 'Connecteurs Souverains & BlockNote',
    description:
      'Intégration directe des données certifiées de l’État et d’Europe (Légifrance, Annuaire Entreprises, BAN, BOAMP, EUR-Lex, Albert IA) au cœur de l’éditeur.',
    countryLabel: 'Sélectionner un jeu de données souverain :',
    quickInsertLabel: 'Insertion rapide :',
  },
  editor: {
    initialTitlePrefix: 'Démonstrateur Officiel — ',
    initialTitleSuffix: 'La Suite Docs / Connecteurs Souverains',
    instructionBlock: ' pour insérer un bloc riche souverain ou ',
    instructionInline: ' pour lier une référence certifiée dans le texte :',
    interlinkExample: 'Exemple d’interlinking certifié dans la phrase : ',
    consultation: ' puis consultation de ',
    slashGroupTitle: 'Sources Officielles & Souveraines',
    emptySearchPlaceholder: 'Tapez / pour insérer un bloc ou @ pour citer une source...',
    datasetLoaded: 'Jeu de données souverain chargé :',
  },
  footer: {
    entity: 'La Suite Numérique • Direction Interministérielle du Numérique (DINUM)',
    compliance: 'Licence MIT • Conforme RGAA v4.1 AA',
  },
};
```

### `demo/src/i18n/en.ts`
```typescript
import { DemoTranslations } from './types';

export const enTranslations: DemoTranslations = {
  nav: {
    title: 'Docs',
    documentation: 'Documentation',
    github: 'GitHub',
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    reset: 'Reset editor',
    selectLanguage: 'Interface language',
  },
  hero: {
    tag: 'Official Playground',
    title: 'Sovereign Connectors & BlockNote',
    description:
      'Direct integration of certified European and national public data registries (Légifrance, Handelsregister, EUR-Lex, Open Data) inside the editor.',
    countryLabel: 'Select a sovereign dataset:',
    quickInsertLabel: 'Quick insert:',
  },
  editor: {
    initialTitlePrefix: 'Official Demo — ',
    initialTitleSuffix: 'La Suite Docs / Sovereign Connectors',
    instructionBlock: ' to insert a sovereign rich block or ',
    instructionInline: ' to link a verified inline citation inside text:',
    interlinkExample: 'Example of verified inline interlinking: ',
    consultation: ' and referencing ',
    slashGroupTitle: 'Official & Sovereign Sources',
    emptySearchPlaceholder: 'Type / to insert a block or @ to cite a source...',
    datasetLoaded: 'Sovereign dataset loaded:',
  },
  footer: {
    entity: 'La Suite Numérique • French Interministerial Digital Directorate (DINUM)',
    compliance: 'MIT License • RGAA v4.1 / WCAG 2.1 AA Compliant',
  },
};
```

### `demo/src/hooks/useLocaleRouter.ts`
```typescript
import { useCallback, useEffect, useState } from 'react';
import { DemoLocale } from '../i18n/types';

export function useLocaleRouter(): [DemoLocale, (newLocale: DemoLocale) => void] {
  const getInitialLocale = (): DemoLocale => {
    if (typeof window === 'undefined') return 'fr';
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en')) return 'en';
    return 'fr';
  };

  const [locale, setLocaleState] = useState<DemoLocale>(getInitialLocale);

  useEffect(() => {
    const handlePopState = () => {
      setLocaleState(getInitialLocale());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLocale = useCallback((newLocale: DemoLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      const targetPath = `/${newLocale}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
  }, []);

  return [locale, setLocale];
}
```

### `demo/src/components/Header.tsx`
```tsx
import React from 'react';
import { DemoLocale, DemoTranslations } from '../i18n/types';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onReset: () => void;
  currentLocale: DemoLocale;
  onLocaleChange: (locale: DemoLocale) => void;
  t: DemoTranslations['nav'];
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onReset,
  currentLocale,
  onLocaleChange,
  t,
}) => {
  return (
    <header className="sober-nav" role="banner">
      <div className="sober-nav-inner">
        <a href={`/${currentLocale}`} className="sober-brand" aria-label="Accueil La Suite Docs">
          <img
            src={isDark ? '/lasuite-dark.svg' : '/lasuite.svg'}
            alt=""
            aria-hidden="true"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <span className="sober-brand-name">{t.title}</span>
        </a>

        <div className="sober-nav-actions">
          <a
            href="https://dinum-docs-waxlands-projects.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="sober-link"
          >
            {t.documentation}
          </a>
          <a
            href="https://github.com/waxland/dinum-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="sober-link"
          >
            {t.github}
          </a>

          <div className="sober-select-wrap">
            <label htmlFor="language-select" className="sr-only">
              {t.selectLanguage}
            </label>
            <select
              id="language-select"
              value={currentLocale}
              onChange={(e) => onLocaleChange(e.target.value as DemoLocale)}
              className="sober-select"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="sober-btn"
            aria-label={isDark ? t.themeLight : t.themeDark}
          >
            {isDark ? '☀️ Clair' : '🌙 Sombre'}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="sober-btn sober-btn-danger"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </header>
  );
};
```

### `demo/src/components/Hero.tsx`
```tsx
import React from 'react';
import { SourceIcon, type SourceEntityType, type SupportedCountry } from '@suitenumerique/blocknote-sources';
import { COUNTRY_PRESETS } from '../presets.config';
import { DemoTranslations } from '../i18n/types';

interface HeroProps {
  currentCountry: SupportedCountry;
  onCountryChange: (country: SupportedCountry) => void;
  onInsert: (type: SourceEntityType) => void;
  t: DemoTranslations['hero'];
}

export const Hero: React.FC<HeroProps> = ({
  currentCountry,
  onCountryChange,
  onInsert,
  t,
}) => {
  const activePreset = COUNTRY_PRESETS[currentCountry];

  return (
    <section className="sober-hero" aria-labelledby="hero-title">
      <div className="sober-badge">{t.tag}</div>
      <h1 id="hero-title">{t.title}</h1>
      <p>{t.description}</p>

      <div className="sober-toolbar">
        <span className="sober-toolbar-label">{t.countryLabel}</span>
        <div className="sober-btn-group" role="radiogroup" aria-label={t.countryLabel}>
          {(Object.keys(COUNTRY_PRESETS) as SupportedCountry[]).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currentCountry === c}
              onClick={() => onCountryChange(c)}
              className={`sober-chip ${currentCountry === c ? 'active' : ''}`}
            >
              <span aria-hidden="true">{COUNTRY_PRESETS[c].flag}</span>
              <span>{COUNTRY_PRESETS[c].name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sober-toolbar" style={{ marginTop: '8px' }}>
        <span className="sober-toolbar-label">{t.quickInsertLabel}</span>
        <div className="sober-btn-group">
          {activePreset.buttons.map((btn) => (
            <button
              key={btn.type + btn.label}
              type="button"
              onClick={() => onInsert(btn.type)}
              className="sober-chip sober-chip-sm"
              title={btn.desc}
            >
              <SourceIcon type={btn.type} size={13} color="currentColor" />
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### `demo/src/components/Footer.tsx`
```tsx
import React from 'react';
import { DemoTranslations } from '../i18n/types';

interface FooterProps {
  t: DemoTranslations['footer'];
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="sober-footer" role="contentinfo">
      <div>{t.entity}</div>
      <div>{t.compliance}</div>
    </footer>
  );
};
```

### `demo.css`
```css
:root {
  --font-family: Marianne, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --bg-page: #ffffff;
  --bg-surface: #f6f6f6;
  --text-primary: #161616;
  --text-secondary: #4a4a4a;
  --text-muted: #666666;
  --border-color: #e5e5e5;
  --border-active: #000091;
  --blue-france: #000091;
  --danger-color: #ce0500;
}

body.dark {
  --bg-page: #161616;
  --bg-surface: #242424;
  --text-primary: #f5f5f5;
  --text-secondary: #cccccc;
  --text-muted: #888888;
  --border-color: #383838;
  --border-active: #8585f6;
  --blue-france: #8585f6;
  --danger-color: #ff6868;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background-color: var(--bg-page);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sober-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sober-main {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 64px 24px;
  flex: 1;
}

.sober-nav {
  width: 100%;
  background: var(--bg-page);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
}

.sober-nav-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.sober-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1rem;
}

.sober-brand img {
  height: 20px;
  width: auto;
}

.sober-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sober-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
}

.sober-link:focus-visible,
.sober-btn:focus-visible,
.sober-select:focus-visible,
.sober-chip:focus-visible {
  outline: 2px solid var(--border-active);
  outline-offset: 2px;
}

.sober-select {
  font-family: inherit;
  font-size: 0.875rem;
  padding: 4px 8px;
  background: var(--bg-page);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
}

.sober-btn {
  font-family: inherit;
  font-size: 0.875rem;
  padding: 4px 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
}

.sober-btn-danger {
  color: var(--danger-color);
}

.sober-hero {
  margin-bottom: 28px;
}

.sober-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--blue-france);
  margin-bottom: 8px;
}

.sober-hero h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.sober-hero p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.sober-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.sober-toolbar-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.sober-btn-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.sober-chip {
  font-family: inherit;
  font-size: 0.8125rem;
  padding: 4px 10px;
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.sober-chip.active {
  background: var(--bg-page);
  color: var(--text-primary);
  border-color: var(--border-active);
  font-weight: 600;
}

.sober-chip-sm {
  font-size: 0.75rem;
  padding: 3px 8px;
}

.sober-editor-wrap {
  min-height: 400px;
  padding-top: 16px;
}

.bn-container {
  font-family: var(--font-family) !important;
  color: var(--text-primary) !important;
  background: transparent !important;
}

.bn-editor {
  padding: 0 !important;
}

.sober-footer {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  color: var(--text-muted);
  flex-wrap: wrap;
  gap: 12px;
}
```

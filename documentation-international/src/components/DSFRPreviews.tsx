import { useState } from "react";

/**
 * Visual Color Palette for DSFR documentation.
 */
export function ColorPalettePreview() {
  return (
    <div className="not-prose my-6 space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Couleurs Institutionnelles de l'État
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg bg-[#000091] text-white shadow-xs">
            <div className="text-sm font-bold">Bleu France</div>
            <div className="text-xs opacity-80 font-mono mt-1">#000091</div>
            <div className="text-[11px] opacity-70 mt-2">
              --blue-france-sun-113
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#f5f5fe] border border-blue-200 text-[#000091] shadow-xs">
            <div className="text-sm font-bold">Bleu France 975</div>
            <div className="text-xs opacity-80 font-mono mt-1">#f5f5fe</div>
            <div className="text-[11px] opacity-70 mt-2">--blue-france-975</div>
          </div>
          <div className="p-4 rounded-lg bg-[#E1000F] text-white shadow-xs">
            <div className="text-sm font-bold">Rouge Marianne</div>
            <div className="text-xs opacity-80 font-mono mt-1">#E1000F</div>
            <div className="text-[11px] opacity-70 mt-2">
              --red-marianne-425
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Couleurs Sémantiques d'État
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[#18753C] text-white shadow-xs">
            <div className="text-xs font-bold">Succès (Success)</div>
            <div className="text-[11px] opacity-80 font-mono">#18753C</div>
          </div>
          <div className="p-3 rounded-lg bg-[#CE0500] text-white shadow-xs">
            <div className="text-xs font-bold">Erreur (Error)</div>
            <div className="text-[11px] opacity-80 font-mono">#CE0500</div>
          </div>
          <div className="p-3 rounded-lg bg-[#B34000] text-white shadow-xs">
            <div className="text-xs font-bold">Alerte (Warning)</div>
            <div className="text-[11px] opacity-80 font-mono">#B34000</div>
          </div>
          <div className="p-3 rounded-lg bg-[#0063CB] text-white shadow-xs">
            <div className="text-xs font-bold">Info (Info)</div>
            <div className="text-[11px] opacity-80 font-mono">#0063CB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Specimen Typography for Marianne.
 */
export function TypographySpecimen() {
  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4 font-marianne">
      <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-400 font-mono">
          Display 1 (2.5rem / 40px - Bold)
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          La Suite Numérique
        </div>
      </div>
      <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-400 font-mono">
          Heading 1 (2.0rem / 32px - Bold)
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Édition collaborative & souveraine
        </div>
      </div>
      <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-400 font-mono">
          Heading 2 (1.5rem / 24px - Bold)
        </div>
        <div className="text-xl font-bold text-[#000091] dark:text-[#8585f6]">
          Structure des micro-services et API
        </div>
      </div>
      <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-400 font-mono">
          Body / Corps de texte (1.0rem / 16px - Regular)
        </div>
        <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
          Les outils numériques de l'État sont conçus pour être accessibles,
          ouverts et interopérables. Chaque composant respecte les critères
          d'accessibilité numérique du RGAA.
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-gray-400 font-mono">
          Body Small & Métadonnées (0.875rem / 14px)
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Dernière mise à jour le 13 septembre 2026 par l'équipe DINUM.
        </div>
      </div>
    </div>
  );
}

/**
 * Icons preview catalog.
 */
export function IconsCatalog() {
  const icons = [
    { emoji: "📁", name: "Folder", desc: "Dossiers & Arborescence" },
    { emoji: "📝", name: "FileText", desc: "Documents & Notes" },
    { emoji: "🔍", name: "Search", desc: "Recherche globale" },
    { emoji: "⚙️", name: "Settings", desc: "Configuration système" },
    { emoji: "👥", name: "Users", desc: "Membres & Annuaire" },
    { emoji: "🔒", name: "Lock", desc: "Sécurité & Secrets" },
  ];

  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
        Icônes Fréquentes dans La Suite
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center gap-1.5 transition-colors"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {item.name}
            </span>
            <span className="text-[10px] text-gray-400">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DSFR Buttons interactive showcase.
 */
export function ButtonPreview() {
  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6">
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Variantes Officielles DSFR (fr-btn)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="fr-btn">
            Bouton Primaire
          </button>
          <button type="button" className="fr-btn fr-btn--secondary">
            Bouton Secondaire
          </button>
          <button type="button" className="fr-btn fr-btn--tertiary">
            Bouton Tertiaire
          </button>
          <button type="button" className="fr-btn fr-btn--tertiary-no-outline">
            Tertiaire sans contour
          </button>
          <button
            type="button"
            className="fr-btn"
            style={{ backgroundColor: "#CE0500" }}
          >
            Bouton Destructif
          </button>
          <button type="button" className="fr-btn" disabled>
            Désactivé
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Tailles Disponibles (fr-btn--sm, md, fr-btn--lg)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="fr-btn fr-btn--sm">
            Petit (sm)
          </button>
          <button type="button" className="fr-btn">
            Moyen (md - standard)
          </button>
          <button type="button" className="fr-btn fr-btn--lg">
            Grand (lg)
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Avec Icônes Intégrées (Remix Icon / DSFR)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="fr-btn fr-icon-add-line fr-btn--icon-left"
          >
            Créer un document
          </button>
          <button
            type="button"
            className="fr-btn fr-btn--secondary fr-icon-download-line fr-btn--icon-right"
          >
            Télécharger l'export
          </button>
          <button
            type="button"
            className="fr-btn fr-btn--tertiary fr-icon-delete-line fr-btn--icon-left"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Badges and status dots.
 */
export function BadgePreview() {
  const [selectedTag, setSelectedTag] = useState<string>("DINUM");

  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6">
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Badges de Statut DSFR (fr-badge)
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="fr-badge fr-badge--success">Succès / Actif</span>
          <span className="fr-badge fr-badge--error">Erreur / Échec</span>
          <span className="fr-badge fr-badge--warning">En Attente</span>
          <span className="fr-badge fr-badge--info">Information</span>
          <span className="fr-badge fr-badge--new">Nouveau</span>
          <span className="fr-badge">Neutre</span>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Puces Indicatrices (Status Dots)
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PostgreSQL 16 en ligne</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Synchronisation en cours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Service arrêté</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Tags Interactifs DSFR (fr-tag)
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {["DINUM", "OpenSource", "Keycloak", "42-Oléron"].map((tag) => (
            <button
              key={tag}
              type="button"
              className="fr-tag"
              aria-pressed={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
            >
              # {tag}
            </button>
          ))}
          <span className="fr-tag fr-tag--sm">Tag compact (sm)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Alerts showcase.
 */
export function AlertPreview() {
  return (
    <div className="not-prose my-6 space-y-4">
      <div className="fr-alert fr-alert--info">
        <h3 className="fr-alert__title">Information Système</h3>
        <div className="text-sm">
          La mise à jour de la documentation est synchronisée automatiquement
          avec le dépôt Git.
        </div>
      </div>
      <div className="fr-alert fr-alert--success">
        <h3 className="fr-alert__title">Modifications Enregistrées</h3>
        <div className="text-sm">
          Votre document a été sauvegardé avec succès sur le stockage souverain
          S3.
        </div>
      </div>
      <div className="fr-alert fr-alert--warning">
        <h3 className="fr-alert__title">Expiration de Session Proche</h3>
        <div className="text-sm">
          Votre jeton OIDC expire dans 5 minutes. Pensez à enregistrer vos
          travaux en cours.
        </div>
      </div>
      <div className="fr-alert fr-alert--error">
        <h3 className="fr-alert__title">Erreur de Connexion à la Base</h3>
        <div className="text-sm">
          Impossible de joindre le serveur PostgreSQL sur le port 15432.
          Vérifiez que Docker est actif.
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Confirmation Modal showcase.
 */
export function ModalPreview() {
  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4 max-w-xl">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        Exemple de Modale de Confirmation DSFR
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-850 shadow-md">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-base mb-2">
          <span>⚠️</span>
          <span>Confirmer la suppression du document</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Êtes-vous sûr de vouloir supprimer définitivement{" "}
          <strong>« Cahier des charges DINUM v2 »</strong> ? Cette action est
          irréversible.
        </div>
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button type="button" className="fr-btn fr-btn--secondary fr-btn--sm">
            Annuler
          </button>
          <button
            type="button"
            className="fr-btn fr-btn--sm"
            style={{ backgroundColor: "#CE0500" }}
          >
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Notices (Bandeaux) showcase.
 */
export function NoticePreview() {
  const [closed, setClosed] = useState(false);

  return (
    <div className="not-prose my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden space-y-4">
      {!closed && (
        <div className="fr-notice fr-notice--info">
          <div className="fr-container">
            <div className="fr-notice__body">
              <div className="fr-notice__title">
                <span className="fr-text--bold">Maintenance planifiée :</span>{" "}
                Une coupure de service interviendra le mardi 12 mai entre 02h00
                et 04h00 pour la migration du cluster PostgreSQL.
              </div>
              <button
                type="button"
                className="fr-btn--close fr-btn"
                title="Masquer le message"
                onClick={() => setClosed(true)}
              >
                Masquer
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fr-notice fr-notice--alert">
        <div className="fr-container">
          <div className="fr-notice__body">
            <div className="fr-notice__title">
              <span className="fr-text--bold">Version de développement :</span>{" "}
              Ce portail est une version de pré-qualification. Ne pas y saisir
              de données classifiées.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Accessible Data Table showcase.
 */
export function TablePreview() {
  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-x-auto">
      <div className="fr-table fr-table--bordered">
        <table>
          <caption>Membres et rôles du projet</caption>
          <thead>
            <tr>
              <th scope="col">Agent / Utilisateur</th>
              <th scope="col">Email professionnel</th>
              <th scope="col">Rôle</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vincent G.</td>
              <td>vincent.guerand@numerique.gouv.fr</td>
              <td>Administrateur</td>
              <td>
                <span className="fr-badge fr-badge--success fr-badge--sm">
                  Actif
                </span>
              </td>
            </tr>
            <tr>
              <td>Damien S.</td>
              <td>damien.s@collectivite.fr</td>
              <td>Éditeur</td>
              <td>
                <span className="fr-badge fr-badge--success fr-badge--sm">
                  Actif
                </span>
              </td>
            </tr>
            <tr>
              <td>Claire M.</td>
              <td>claire.m@interieur.gouv.fr</td>
              <td>Lecteur</td>
              <td>
                <span className="fr-badge fr-badge--info fr-badge--sm">
                  Invité
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * DSFR Accessible Form inputs showcase.
 */
export function FormPreview() {
  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6 max-w-xl">
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="input-preview-title">
          Nom du document collaboratif
          <span className="fr-hint-text">
            Indiquez un titre clair pour faciliter la recherche.
          </span>
        </label>
        <input
          className="fr-input"
          type="text"
          id="input-preview-title"
          name="title"
          placeholder="Ex: Compte-rendu de réunion DINUM"
        />
      </div>

      <div className="fr-select-group">
        <label className="fr-label" htmlFor="select-preview-role">
          Rôle dans l'organisation
        </label>
        <select className="fr-select" id="select-preview-role" name="role">
          <option value="admin">Administrateur de projet</option>
          <option value="editor">Éditeur / Rédacteur</option>
          <option value="reader">Lecteur seul</option>
        </select>
      </div>

      <div className="fr-input-group fr-input-group--error">
        <label className="fr-label" htmlFor="input-preview-err">
          Adresse email gouvernementale
        </label>
        <input
          className="fr-input fr-input--error"
          type="text"
          id="input-preview-err"
          name="email"
          defaultValue="nom.prenom@invalide"
          aria-describedby="input-preview-err-desc"
        />
        <div
          id="input-preview-err-desc"
          className="fr-error-text text-xs text-red-600 mt-1"
        >
          Format d'adresse email incorrect (@gouv.fr ou @collectivite.fr
          attendu).
        </div>
      </div>

      <div className="fr-fieldset__element">
        <div className="fr-checkbox-group">
          <input
            type="checkbox"
            id="checkbox-preview-1"
            name="notifications"
            defaultChecked
          />
          <label className="fr-label" htmlFor="checkbox-preview-1">
            Activer les notifications instantanées par email
          </label>
        </div>
      </div>
    </div>
  );
}

/**
 * DSFR Cards & Collapsible Accordion showcase.
 */
export function CardContainerPreview() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="not-prose my-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="fr-card fr-enlarge-link">
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title">
                <a href="#">Guide de Déploiement Souverain</a>
              </h3>
              <div className="fr-card__desc text-sm text-gray-600 dark:text-gray-300">
                Architecture de référence pour l'installation sur clusters
                Kubernetes et serveurs locaux DINUM.
              </div>
              <div className="fr-card__start">
                <div className="fr-card__detail text-xs text-gray-500">
                  📝 Docs • Modifié il y a 10 min
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fr-card fr-enlarge-link">
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title">
                <a href="#">Sprint 42 : Authentification ProConnect</a>
              </h3>
              <div className="fr-card__desc text-sm text-gray-600 dark:text-gray-300">
                Mise en place de la fédération OIDC et configuration des
                redirections inter-domaines.
              </div>
              <div className="fr-card__start">
                <div className="fr-card__detail text-xs text-gray-500">
                  📊 Projects • Échéance : Demain
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="fr-accordion">
        <h3 className="fr-accordion__title">
          <button
            type="button"
            className="fr-accordion__btn"
            aria-expanded={accordionOpen}
            onClick={() => setAccordionOpen(!accordionOpen)}
          >
            Détails de configuration réseau Docker
          </button>
        </h3>
        {accordionOpen && (
          <div className="fr-collapse" id="accordion-preview-1">
            <div className="text-sm p-4 text-gray-700 dark:text-gray-300">
              Les conteneurs communiquent sur le réseau de pont{" "}
              <code>lasuite-network</code>.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/**
 * DSFR Stepper & Pagination showcase.
 */
export function PaginationStepperPreview() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="not-prose my-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6">
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Indicateur d'étapes (Stepper)
        </div>
        <div className="fr-stepper">
          <h2 className="fr-stepper__title">
            <span className="fr-stepper__state">Étape 2 sur 3</span>
            Configuration des accès et rôles
          </h2>
          <div
            className="fr-stepper__steps"
            data-fr-current-step="2"
            data-fr-steps="3"
          ></div>
          <div className="fr-stepper__details text-xs mt-2">
            <span className="fr-text--bold">Étape suivante :</span> Validation
            et déploiement
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Pagination DSFR
        </div>
        <nav
          role="navigation"
          className="fr-pagination"
          aria-label="Pagination"
        >
          <ul className="fr-pagination__list">
            <li>
              <button
                type="button"
                className="fr-pagination__link fr-pagination__link--first"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                Première page
              </button>
            </li>
            <li>
              <button
                type="button"
                className="fr-pagination__link fr-pagination__link--prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                Page précédente
              </button>
            </li>
            {[1, 2, 3].map((page) => (
              <li key={page}>
                <button
                  type="button"
                  className="fr-pagination__link"
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="fr-pagination__link fr-pagination__link--next"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              >
                Page suivante
              </button>
            </li>
            <li>
              <button
                type="button"
                className="fr-pagination__link fr-pagination__link--last"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage(3)}
              >
                Dernière page
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

/**
 * DSFR Header & Breadcrumb structure showcase.
 */
export function HeaderBreadcrumbPreview() {
  return (
    <div className="not-prose my-6 space-y-6">
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <div className="fr-logo">
                      République
                      <br />
                      Française
                    </div>
                  </div>
                </div>
                <div className="fr-header__service">
                  <a href="#" title="Accueil - La Suite numérique">
                    <div className="fr-header__service-title font-bold text-lg">
                      La Suite numérique
                    </div>
                  </a>
                  <div className="fr-header__service-tagline text-xs text-gray-500">
                    Docs & Outils collaboratifs souverains
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav
        role="navigation"
        className="fr-breadcrumb"
        aria-label="vous êtes ici :"
      >
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-preview"
        >
          Voir le fil d'Ariane
        </button>
        <div className="fr-collapse" id="breadcrumb-preview">
          <ol className="fr-breadcrumb__list">
            <li>
              <a className="fr-breadcrumb__link" href="/">
                Accueil
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" href="/04-design-system">
                Design System
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                Navigation & Layout
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}

import React, { useState } from "react";

export interface KanbanCardItem {
  id: string | number;
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "amber" | "purple" | "red" | "gray";
  priority?: "P0" | "P1" | "P2" | "Haute" | "Moyenne" | "Basse";
  tags?: string[];
  assignee?: string;
  href?: string;
  progress?: number; // 0 to 100
  milestone?: string;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  badge?: string;
  color?: "slate" | "blue" | "amber" | "purple" | "emerald" | "red";
  items: KanbanCardItem[];
}

export interface KanbanProps {
  title?: string;
  description?: string;
  columns?: KanbanColumnData[];
  filterTags?: boolean;
}

const DEFAULT_SLASH_KANBAN: KanbanColumnData[] = [
  {
    id: "backlog",
    title: "1. Idéation & Cadrage",
    badge: "3 idées",
    color: "slate",
    items: [
      {
        id: "cmd-marches",
        title: "/marche — Marchés Publics & BOAMP",
        description: "Avis d'appels publics à la concurrence (AAPC), critères d'attribution et DCE.",
        badge: "Commande Slash",
        badgeColor: "gray",
        priority: "P2",
        tags: ["Marchés", "BOAMP", "Achat"],
        assignee: "DINUM / DAE",
        milestone: "Q3 2026",
      },
      {
        id: "cmd-ban",
        title: "/adresse — Base Adresse Nationale (BAN)",
        description: "Autocomplétion certifiée des adresses postales françaises et coordonnées GPS.",
        badge: "Commande Slash",
        badgeColor: "blue",
        priority: "P2",
        tags: ["BAN", "Géolocalisation"],
        assignee: "ANCT / IGN",
        milestone: "Q3 2026",
      },
      {
        id: "cmd-insee",
        title: "/stats — Données INSEE & Territoires",
        description: "Chiffres clés démographiques et économiques par commune ou département.",
        badge: "Commande Slash",
        badgeColor: "purple",
        priority: "P2",
        tags: ["INSEE", "Open Data"],
        assignee: "INSEE",
        milestone: "Q4 2026",
      },
    ],
  },
  {
    id: "spec",
    title: "2. Spécification & Architecture",
    badge: "2 commandes",
    color: "purple",
    items: [
      {
        id: "cmd-pappers",
        title: "/pappers — Entreprises & Registre Légal",
        description: "Insertion d'une fiche d'entreprise certifiée (SIREN, dirigeants, bilans, procédures).",
        badge: "Nouveau • Spécifié",
        badgeColor: "purple",
        priority: "P1",
        tags: ["Pappers", "API Entreprise", "SIREN"],
        assignee: "Équipe Docs",
        href: "/08-slash/pappers",
        progress: 60,
        milestone: "Sprint 14",
      },
      {
        id: "cmd-assemblee",
        title: "/assemblee — Travail Parlementaire (claire.vite)",
        description: "Suivi des projets de loi, amendements en direct, fiches députés et votes de l'Assemblée.",
        badge: "Nouveau • Spécifié",
        badgeColor: "blue",
        priority: "P1",
        tags: ["Parlement", "claire.vite", "Amendements"],
        assignee: "Cabinet & DINUM",
        href: "/08-slash/assemblee",
        progress: 50,
        milestone: "Sprint 14",
      },
    ],
  },
  {
    id: "dev",
    title: "3. En Développement & PoC",
    badge: "2 sujets",
    color: "blue",
    items: [
      {
        id: "cmd-loi-front",
        title: "/loi — Custom Block BlockNote (React)",
        description: "Composant BlockNote interactif avec modes d'affichage Badge, Fiche, Citation et Article complet.",
        badge: "Frontend",
        badgeColor: "blue",
        priority: "P0",
        tags: ["BlockNote", "React 19", "DSFR"],
        assignee: "Dev Front",
        href: "/08-slash/loi/04-frontend-blocknote",
        progress: 80,
        milestone: "Hackathon 42",
      },
      {
        id: "cmd-loi-back",
        title: "/loi — Proxy Django & Cache Redis",
        description: "Endpoints /api/v1/laws/suggest et search avec authentification OAuth2 PISTE et cache 24h.",
        badge: "Backend",
        badgeColor: "green",
        priority: "P0",
        tags: ["Django 5", "Redis", "PISTE"],
        assignee: "Dev Back",
        href: "/08-slash/loi/03-backend-django",
        progress: 85,
        milestone: "Hackathon 42",
      },
    ],
  },
  {
    id: "testing",
    title: "4. Recette & Validation",
    badge: "1 sujet",
    color: "amber",
    items: [
      {
        id: "cmd-loi-e2e",
        title: "/loi — Tests E2E Playwright & RGAA",
        description: "Scénarios complets de recherche Légifrance, insertion dans le doc et validation clavier/accessibilité.",
        badge: "QA & Accessibilité",
        badgeColor: "amber",
        priority: "P0",
        tags: ["Playwright", "RGAA", "E2E"],
        assignee: "QA / Accessibilité",
        href: "/08-slash/loi",
        progress: 70,
        milestone: "Hackathon 42",
      },
    ],
  },
  {
    id: "done",
    title: "5. En Production / Validé",
    badge: "3 commandes",
    color: "emerald",
    items: [
      {
        id: "cmd-meet",
        title: "/meet — Salon Visio Sécurisé",
        description: "Génération instantanée d'un salon visioconférence La Suite Meet dans l'éditeur.",
        badge: "En Ligne",
        badgeColor: "green",
        priority: "P0",
        tags: ["Meet", "LiveKit", "Visio"],
        assignee: "Core Team",
        href: "/03-projets/02-communication-et-echange/meet",
        progress: 100,
        milestone: "v1.2",
      },
      {
        id: "cmd-decision",
        title: "/decision — Bloc Arbitrage & Vote",
        description: "Bloc de vote en équipe avec persistance CRDT Yjs et décompte synchrone.",
        badge: "En Ligne",
        badgeColor: "green",
        priority: "P1",
        tags: ["Vote", "CRDT", "Collaboration"],
        assignee: "Core Team",
        href: "/06-tutoriels/01-developpement-applicatif/creer-un-bloc-docs",
        progress: 100,
        milestone: "v1.1",
      },
      {
        id: "cmd-grist",
        title: "/grist — Tableau de Données Souverain",
        description: "Intégration iFrame sécurisée et widget de données relationnelles Grist.",
        badge: "En Ligne",
        badgeColor: "green",
        priority: "P1",
        tags: ["Grist", "Tableaux", "Données"],
        assignee: "ANCT / DINUM",
        href: "/03-projets/01-documents-et-contenus/grist",
        progress: 100,
        milestone: "v1.0",
      },
    ],
  },
];

const BADGE_COLOR_CLASSES = {
  blue: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  green: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  amber: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  purple: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  red: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

const COLUMN_COLOR_CLASSES = {
  slate: {
    header: "border-t-slate-500 bg-slate-50/70 dark:bg-slate-900/60",
    badge: "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-800",
  },
  blue: {
    header: "border-t-blue-600 bg-blue-50/60 dark:bg-blue-950/30",
    badge: "bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  purple: {
    header: "border-t-purple-600 bg-purple-50/60 dark:bg-purple-950/30",
    badge: "bg-purple-100 dark:bg-purple-900/70 text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  amber: {
    header: "border-t-amber-500 bg-amber-50/60 dark:bg-amber-950/30",
    badge: "bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-900/50",
  },
  emerald: {
    header: "border-t-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30",
    badge: "bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
  red: {
    header: "border-t-rose-600 bg-rose-50/60 dark:bg-rose-950/30",
    badge: "bg-rose-100 dark:bg-rose-900/70 text-rose-800 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-900/50",
  },
};

export const Kanban: React.FC<KanbanProps> = ({
  title,
  description,
  columns = DEFAULT_SLASH_KANBAN,
  filterTags = true,
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      columns.flatMap((col) => col.items.flatMap((item) => item.tags || []))
    )
  );

  return (
    <div className="not-prose my-8 w-full">
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 m-0">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 m-0">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Filter by tag */}
      {filterTags && allTags.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-1.5 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1.5">
            🏷️ Filtrer par tag :
          </span>
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`cursor-pointer text-xs font-medium px-2.5 py-1 rounded-md transition-all ${
              selectedTag === null
                ? "bg-blue-600 text-white shadow-xs font-semibold"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            Tous ({columns.reduce((acc, col) => acc + col.items.length, 0)})
          </button>
          {allTags.map((tag) => {
            const count = columns.reduce(
              (acc, col) =>
                acc +
                col.items.filter((item) => item.tags?.includes(tag)).length,
              0
            );
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`cursor-pointer text-xs font-medium px-2.5 py-1 rounded-md transition-all ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                #{tag} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Kanban Board Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
        {columns.map((col) => {
          const colorCfg =
            COLUMN_COLOR_CLASSES[col.color || "slate"] ||
            COLUMN_COLOR_CLASSES.slate;
          const filteredItems = selectedTag
            ? col.items.filter((item) => item.tags?.includes(selectedTag))
            : col.items;

          return (
            <div
              key={col.id}
              className={`flex-shrink-0 w-80 min-w-[280px] rounded-xl border ${colorCfg.border} bg-gray-50/60 dark:bg-gray-900/60 flex flex-col snap-start shadow-xs`}
            >
              {/* Column Header */}
              <div
                className={`p-3.5 rounded-t-xl border-t-4 ${colorCfg.header} border-b border-gray-200 dark:border-gray-800 flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 m-0">
                    {col.title}
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${colorCfg.badge}`}
                >
                  {filteredItems.length}
                </span>
              </div>

              {/* Column Body Cards */}
              <div className="p-3 flex flex-col gap-3 flex-1 min-h-[160px]">
                {filteredItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                      Aucun élément dans cette étape
                    </span>
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const badgeColor =
                      BADGE_COLOR_CLASSES[item.badgeColor || "blue"];

                    const cardNode = (
                      <div className="p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/90 shadow-xs hover:shadow-md transition-all hover:border-blue-400 dark:hover:border-blue-600 flex flex-col justify-between group">
                        <div>
                          {/* Card Header: Badges & Priority */}
                          <div className="flex items-center justify-between gap-1.5 mb-2">
                            {item.badge && (
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            )}
                            {item.priority && (
                              <span
                                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                                  item.priority === "P0" ||
                                  item.priority === "Haute"
                                    ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400"
                                    : item.priority === "P1" ||
                                        item.priority === "Moyenne"
                                      ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400"
                                      : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                                }`}
                              >
                                {item.priority}
                              </span>
                            )}
                          </div>

                          {/* Card Title */}
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h4>

                          {/* Card Description */}
                          {item.description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 m-0 leading-snug">
                              {item.description}
                            </p>
                          )}

                          {/* Progress bar if present */}
                          {typeof item.progress === "number" && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">
                                <span>Avancement</span>
                                <span>{item.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    item.progress === 100
                                      ? "bg-emerald-500"
                                      : item.progress > 50
                                        ? "bg-blue-600"
                                        : "bg-amber-500"
                                  }`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Tags & Assignee */}
                        <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60 flex flex-col gap-2">
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            {item.assignee && (
                              <span className="flex items-center gap-1">
                                <span>👤</span> {item.assignee}
                              </span>
                            )}
                            {item.milestone && (
                              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                                🎯 {item.milestone}
                              </span>
                            )}
                          </div>

                          {item.href && (
                            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-end gap-1 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                              <span>Voir la doc</span>
                              <span>→</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );

                    if (item.href) {
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          className="no-underline block"
                        >
                          {cardNode}
                        </a>
                      );
                    }

                    return <div key={item.id}>{cardNode}</div>;
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

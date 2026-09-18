import { useState } from "react";

export type RoleType = "frontend" | "backend" | "devops" | "product";

interface TrackStep {
  title: string;
  description: string;
  link: string;
  badge: string;
  time: string;
}

interface TrackConfig {
  id: RoleType;
  title: string;
  icon: string;
  subtitle: string;
  steps: TrackStep[];
}

const TRACKS: TrackConfig[] = [
  {
    id: "frontend",
    title: "Frontend & BlockNote",
    icon: "⚛️",
    subtitle: "Développement React 19, TypeScript strict, extension BlockNote et Design System DSFR / Cunningham.",
    steps: [
      {
        title: "1. Configuration de l'Éditeur & VS Code",
        description: "Installation des extensions recommandées (ESLint, Prettier, GitLens) et typage strict.",
        link: "/fr/01-onboarding/01-demarrage/vscode",
        badge: "Outillage",
        time: "5 min",
      },
      {
        title: "2. Découverte du Socle Technique Slasher",
        description: "Comprendre le CustomBlock unique, les 3 modes DSFR (Callout, Carte, Lien) et les flux CRDT Yjs.",
        link: "/fr/03-slasheurs-france/00-socle-technique",
        badge: "Architecture",
        time: "10 min",
      },
      {
        title: "3. Bac à Sable BlockNote & Démos Interactives",
        description: "Tester en direct les commandes /loi, /entreprise, /albert et le rendu visuel.",
        link: "/fr/03-slasheurs-france/01-architecture-standardisee",
        badge: "Pratique",
        time: "15 min",
      },
      {
        title: "4. Guide SDK : Créer un Provider en 15 min",
        description: "Implémenter une nouvelle source souveraine avec defineSourceProvider.",
        link: "/fr/03-slasheurs-france/06-sdk-developpeur",
        badge: "Code",
        time: "15 min",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Python & Django",
    icon: "🐍",
    subtitle: "Architecture Django 5.2, DRF, Registry dynamique, cache Redis déterministe et sécurité anti-SSRF.",
    steps: [
      {
        title: "1. Standards d'Ingénierie Python DINUM",
        description: "Règles de style Ruff (88 car.), typage statique typing et gestion sécurisée des secrets.",
        link: "/fr/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite",
        badge: "Standards",
        time: "5 min",
      },
      {
        title: "2. Proxy Backend, Anti-SSRF & Circuit Breakers",
        description: "Protection contre les pannes réseau, timeouts 3.5s et isolation réseau SecNumCloud.",
        link: "/fr/01-onboarding/02-workflow-et-contribution/adr/0003-proxy-django-anti-ssrf-circuit-breaker",
        badge: "Sécurité",
        time: "10 min",
      },
      {
        title: "3. Tutoriel : Ajouter une API en 10 minutes",
        description: "Hériter de BaseSourceProvider, brancher une API publique et enregistrer le provider.",
        link: "/fr/03-slasheurs-france/04-tutoriel-ajouter-une-api",
        badge: "Tutoriel",
        time: "10 min",
      },
      {
        title: "4. Tests de Régression & Validation Pytest",
        description: "Exécution des 46 tests unitaires et vérification de la résilience aux codes HTTP 429.",
        link: "/fr/01-onboarding/02-workflow-et-contribution/tests-et-qualite",
        badge: "Tests",
        time: "5 min",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    icon: "🐳",
    subtitle: "Orchestration Docker, déploiement sur serveurs distants, CI/CD GitHub Actions et DCO signoff.",
    steps: [
      {
        title: "1. Configuration Machine Hôte (OrbStack / Colima)",
        description: "Optimisation des ressources mémoire, conteneurs légers et Node.js / Python LTS.",
        link: "/fr/01-onboarding/01-demarrage/environnement-machine-hote",
        badge: "Infra",
        time: "5 min",
      },
      {
        title: "2. Déploiement sur Serveur Distant / VM Cloud",
        description: "Configuration OIDC Keycloak, URLs publiques et gestion des fichiers .local.",
        link: "/fr/01-onboarding/01-demarrage/configuration-serveur/01-guide-configuration-serveur",
        badge: "Déploiement",
        time: "15 min",
      },
      {
        title: "3. Pipeline CI/CD GitHub Actions & Packaging",
        description: "Workflows de build, tarballs npm, wheels Python et releases automatisées.",
        link: "/fr/02-la-suite/02-architecture/03-devops-et-deploiement/cicd-github-actions",
        badge: "CI/CD",
        time: "10 min",
      },
    ],
  },
  {
    id: "product",
    title: "Produit, Métier & Juriste",
    icon: "⚖️",
    subtitle: "Cadre juridique, conformité RGPD / DPGA, benchmark des données publiques et cas d'usage ministériels.",
    steps: [
      {
        title: "1. Présentation des 6 Applications La Suite",
        description: "Panorama de Docs, Meet, People, Projects, Transfers et Accounts pour les agents de l'État.",
        link: "/fr/02-la-suite",
        badge: "Produit",
        time: "10 min",
      },
      {
        title: "2. Les 10 Connecteurs Souverains de l'État",
        description: "Fiches métiers pour la Loi (Légifrance), Entreprises (SIRENE), Marchés (BOAMP), Subventions, etc.",
        link: "/fr/03-slasheurs-france",
        badge: "Sources",
        time: "15 min",
      },
      {
        title: "3. Conformité aux Biens Publics Numériques (DPGA)",
        description: "Audit des 9 indicateurs DPGA et alignement avec les Objectifs de Développement Durable (ODD).",
        link: "/fr/01-onboarding/02-workflow-et-contribution/adr",
        badge: "DPGA",
        time: "10 min",
      },
    ],
  },
];

export function OnboardingTracks() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("frontend");

  const currentTrack = TRACKS.find((t) => t.id === selectedRole) || TRACKS[0];

  return (
    <div className="not-prose my-6 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0">
          🧭 Parcours Guidé par Profil
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 m-0 font-sans">
          Sélectionnez votre profil technique ou métier pour afficher la feuille de route :
        </p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
        {TRACKS.map((track) => {
          const isSelected = track.id === selectedRole;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedRole(track.id)}
              className={`p-2.5 text-left transition-colors cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <div className="text-lg mb-0.5">{track.icon}</div>
              <div className="font-semibold text-xs font-sans">
                {track.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Details */}
      <div className="p-3 bg-white dark:bg-gray-800/60">
        <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{currentTrack.icon}</span>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 m-0">
              {currentTrack.title}
            </h4>
          </div>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 m-0 font-sans">
            {currentTrack.subtitle}
          </p>
        </div>

        <div className="space-y-1.5">
          {currentTrack.steps.map((step, idx) => (
            <a
              key={step.title}
              href={step.link}
              className="group flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-900/80 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors no-underline"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <div>
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-sans">
                    {step.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                <span>{step.badge}</span>
                <span>•</span>
                <span>{step.time}</span>
                <span className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

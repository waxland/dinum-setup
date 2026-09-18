import React, { useState } from "react";

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
    <div className="not-prose my-8 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 m-0">
          🧭 Choisissez votre Parcours Guidé
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 m-0">
          Sélectionnez votre profil pour afficher les étapes de lecture et tutoriels prioritaires :
        </p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {TRACKS.map((track) => {
          const isSelected = track.id === selectedRole;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedRole(track.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 dark:border-blue-400 shadow-xs"
                  : "bg-gray-50/60 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <div className="text-2xl mb-1">{track.icon}</div>
              <div className="font-bold text-xs text-gray-900 dark:text-gray-100">
                {track.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Details */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentTrack.icon}</span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 m-0">
              Parcours Recommandé : {currentTrack.title}
            </h4>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 m-0">
            {currentTrack.subtitle}
          </p>
        </div>

        <div className="space-y-2.5">
          {currentTrack.steps.map((step, idx) => (
            <a
              key={step.title}
              href={step.link}
              className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 no-underline transition-all shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                    {step.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                  {step.badge}
                </span>
                <span className="text-[10px] text-gray-400">⏱️ {step.time}</span>
                <span className="text-xs text-blue-500 group-hover:translate-x-0.5 transition-transform">
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

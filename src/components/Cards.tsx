import React from "react";

export interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  badge?: string;
  href?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  href,
}: FeatureCardProps) {
  const content = (
    <div className="h-full p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {icon && <div className="text-2xl mb-2">{icon}</div>}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 m-0">
            {title}
          </h3>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
          {description}
        </p>
      </div>
      {href && (
        <div className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
          <span>Découvrir</span>
          <span>→</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline block group">
        {content}
      </a>
    );
  }

  return content;
}

export function FeatureGrid({
  children,
  cols = 3,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const colClass =
    cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : cols === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`not-prose my-6 grid ${colClass} gap-4`}>{children}</div>
  );
}

export interface TrackCardProps {
  icon?: string;
  trackNumber?: string | number;
  title: string;
  color?: "blue" | "red" | "purple" | "amber" | "emerald";
  badge?: string;
  children: React.ReactNode;
}

export function TrackCard({
  icon = "🎯",
  trackNumber,
  title,
  color = "blue",
  badge,
  children,
}: TrackCardProps) {
  const colorMap = {
    blue: {
      border: "border-blue-200 dark:border-blue-900/60",
      bg: "bg-blue-50/40 dark:bg-blue-950/20",
      title: "text-blue-700 dark:text-blue-400",
      badge: "bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300",
    },
    red: {
      border: "border-red-200 dark:border-red-900/60",
      bg: "bg-red-50/40 dark:bg-red-950/20",
      title: "text-red-700 dark:text-red-400",
      badge: "bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300",
    },
    purple: {
      border: "border-purple-200 dark:border-purple-900/60",
      bg: "bg-purple-50/40 dark:bg-purple-950/20",
      title: "text-purple-700 dark:text-purple-400",
      badge:
        "bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300",
    },
    amber: {
      border: "border-amber-200 dark:border-amber-800/60",
      bg: "bg-amber-50/40 dark:bg-amber-950/20",
      title: "text-amber-800 dark:text-amber-300",
      badge:
        "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300",
    },
    emerald: {
      border: "border-emerald-200 dark:border-emerald-900/60",
      bg: "bg-emerald-50/40 dark:bg-emerald-950/20",
      title: "text-emerald-700 dark:text-emerald-400",
      badge:
        "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300",
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`not-prose p-5 rounded-xl border ${scheme.border} ${scheme.bg} shadow-xs my-4`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className={`text-base font-bold ${scheme.title}`}>
            {trackNumber ? `Track ${trackNumber} : ` : ""}
            {title}
          </span>
        </div>
        {badge && (
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${scheme.badge}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

export interface TutorialCardProps {
  icon?: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function TutorialCard({
  icon = "📖",
  title,
  description,
  href,
  badge,
}: TutorialCardProps) {
  return (
    <a
      href={href}
      className="not-prose no-underline block p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {badge && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors m-0 mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
        {description}
      </p>
    </a>
  );
}

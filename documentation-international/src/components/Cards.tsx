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
    <div className="h-full p-4 bg-gray-50 dark:bg-gray-900 flex flex-col justify-between transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/80">
      <div>
        {icon && <div className="text-xl mb-2">{icon}</div>}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0">
            {title}
          </h3>
          {badge && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-relaxed font-sans">
          {description}
        </p>
      </div>
      {href && (
        <div className="mt-3 text-xs font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
          <span>Découvrir</span>
          <span>→</span>
        </div>
      )}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        href={href}
        className="no-underline block group"
        aria-label={`${title} — ${description}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
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
  badge,
  children,
}: TrackCardProps) {
  return (
    <div className="not-prose p-4 bg-gray-50 dark:bg-gray-900 my-4">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-800">
        <span className="text-lg">{icon}</span>
        {trackNumber && (
          <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">
            #{trackNumber}
          </span>
        )}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0">
          {title}
        </h4>
        {badge && (
          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </div>
      <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
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
      className="no-underline block group p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0">
          {title}
        </h3>
        {badge && (
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-relaxed font-sans">
        {description}
      </p>
      <div className="mt-2 text-xs font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
        <span>Lire le tutoriel</span>
        <span>→</span>
      </div>
    </a>
  );
}

export interface ScheduleItemProps {
  time: string;
  title: string;
  location?: string;
  type?: "transport" | "meal" | "code" | "event" | "party" | "pitch";
  description?: React.ReactNode;
  highlight?: boolean;
}

export function ScheduleItem({
  time,
  title,
  location,
  type = "event",
  description,
  highlight = false,
}: ScheduleItemProps) {
  const typeStyles = {
    transport: {
      badge: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      icon: "🚌",
    },
    meal: {
      badge: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      icon: "🍽️",
    },
    code: {
      badge: "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      icon: "💻",
    },
    event: {
      badge: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      icon: "📢",
    },
    party: {
      badge: "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      icon: "🎉",
    },
    pitch: {
      badge: "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      icon: "🏆",
    },
  };

  const style = typeStyles[type] || typeStyles.event;

  return (
    <div
      className={`not-prose p-4 rounded-lg border transition-all ${
        highlight
          ? "border-blue-400 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-xs"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-gray-300 dark:hover:border-gray-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            {time}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
            <span>{style.icon}</span>
            <span>{title}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {location && (
            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 bg-gray-50 dark:bg-gray-800/80 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
              <span>📍</span>
              <span>{location}</span>
            </span>
          )}
        </div>
      </div>
      {description && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 pl-1 leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}

export interface ScheduleDayProps {
  dayNumber: number;
  date: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
}

export function ScheduleDay({
  dayNumber,
  date,
  title,
  badge,
  children,
}: ScheduleDayProps) {
  return (
    <section className="not-prose my-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-950/40 p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Jour {dayNumber}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {date}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0 mt-0.5">
            {title}
          </h3>
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

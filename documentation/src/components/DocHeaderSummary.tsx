import React from "react";

export interface DocHeaderSummaryProps {
  readingTime?: string;
  level?: "Débutant" | "Intermédiaire" | "Avancé" | "Beginner" | "Intermediate" | "Advanced";
  roles?: string[];
  prerequisites?: string[];
  status?: string;
  statusColor?: "success" | "info" | "warning";
  takeaway?: string;
}

export function DocHeaderSummary({
  readingTime = "5 min",
  level = "Intermédiaire",
  roles = ["Frontend", "Backend"],
  prerequisites = ["Docker", "Git"],
  status = "Production Ready",
  statusColor = "success",
  takeaway,
}: DocHeaderSummaryProps) {
  const statusClasses = {
    success:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/30 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
    warning:
      "bg-amber-500/10 text-amber-400 border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  }[statusColor];

  return (
    <div className="not-prose my-6 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-[#0c1322] shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100 dark:border-blue-900/40 text-xs">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
          <span className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{readingTime}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span>📊</span>
            <span>Niveau : {level}</span>
          </span>
        </div>

        {status && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${statusClasses}`}
          >
            ● {status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
        <div>
          <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">
            🎯 Public cible :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {roles.map((role) => (
              <span
                key={role}
                className="px-2 py-0.5 rounded-md bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-[11px] font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">
            🛠️ Prérequis :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {prerequisites.map((req) => (
              <span
                key={req}
                className="px-2 py-0.5 rounded-md bg-blue-100/60 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-[11px] font-mono"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

      {takeaway && (
        <div className="mt-3 pt-2.5 border-t border-blue-100 dark:border-blue-900/40 text-xs text-gray-800 dark:text-gray-200 flex items-start gap-1.5">
          <span className="text-blue-600 dark:text-blue-400 font-bold">💡 En résumé :</span>
          <span className="italic">{takeaway}</span>
        </div>
      )}
    </div>
  );
}

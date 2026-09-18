
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
  takeaway,
}: DocHeaderSummaryProps) {
  return (
    <div className="not-prose my-5 p-4 bg-gray-50 dark:bg-gray-900 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200 dark:border-gray-800">
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
          <span className="px-2 py-0.2 text-[10px] font-mono uppercase bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2.5">
        <div>
          <span className="font-semibold text-gray-900 dark:text-gray-200 block mb-1">
            🎯 Public cible :
          </span>
          <div className="flex flex-wrap gap-1">
            {roles.map((role) => (
              <span
                key={role}
                className="px-1.5 py-0.2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px]"
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
          <div className="flex flex-wrap gap-1">
            {prerequisites.map((req) => (
              <span
                key={req}
                className="px-1.5 py-0.2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[11px] font-mono"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

      {takeaway && (
        <div className="mt-2.5 pt-2 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300 flex items-start gap-1.5">
          <span className="font-semibold text-gray-900 dark:text-gray-100">💡 En résumé :</span>
          <span>{takeaway}</span>
        </div>
      )}
    </div>
  );
}

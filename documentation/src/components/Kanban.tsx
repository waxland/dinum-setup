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

export const Kanban: React.FC<KanbanProps> = ({
  title,
  description,
  columns = [],
  filterTags = true,
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      columns.flatMap((col) => col.items?.flatMap((item) => item.tags || []) || [])
    )
  );

  const totalItems = columns.reduce((acc, col) => acc + (col.items?.length || 0), 0);

  return (
    <div className="not-prose my-6 w-full">
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 m-0">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 m-0">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Filter by tag - Minimal & Compact */}
      {filterTags && allTags.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-1">
          <span className="text-[11px] text-gray-400 dark:text-gray-500 mr-1">
            Filtre :
          </span>
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`cursor-pointer text-[11px] px-2 py-0.5 rounded transition-colors ${
              selectedTag === null
                ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800"
            }`}
          >
            Tous ({totalItems})
          </button>
          {allTags.map((tag) => {
            const count = columns.reduce(
              (acc, col) =>
                acc +
                (col.items?.filter((item) => item.tags?.includes(tag)).length || 0),
              0
            );
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`cursor-pointer text-[11px] px-2 py-0.5 rounded transition-colors ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800"
                }`}
              >
                #{tag} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Kanban Columns */}
      {columns.length === 0 ? (
        <div className="p-4 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 italic m-0">
            Aucune colonne de données transmise au Kanban.
          </p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-0.5 snap-x">
          {columns.map((col) => {
            const items = col.items || [];
            const filteredItems = selectedTag
              ? items.filter((item) => item.tags?.includes(selectedTag))
              : items;

            return (
              <div
                key={col.id}
                className="flex-shrink-0 w-72 min-w-[250px] rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 p-2 flex flex-col snap-start"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1 py-1 mb-2">
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 m-0 truncate">
                    {col.title}
                  </h4>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
                    {filteredItems.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="flex flex-col gap-2 flex-1 min-h-[80px]">
                  {filteredItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center border border-dashed border-gray-200/80 dark:border-gray-800/80 rounded p-3 text-center">
                      <span className="text-[11px] text-gray-400 italic">
                        Vide
                      </span>
                    </div>
                  ) : (
                    filteredItems.map((item) => {
                      const cardNode = (
                        <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 shadow-2xs hover:border-gray-300 dark:hover:border-gray-700 transition-colors flex flex-col gap-1.5 group">
                          {/* Top Meta Line: Badge / Priority / Milestone */}
                          {(item.badge || item.priority || item.milestone) && (
                            <div className="flex items-center justify-between gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1 overflow-hidden">
                                {item.badge && (
                                  <span className="truncate bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded font-medium">
                                    {item.badge}
                                  </span>
                                )}
                                {item.priority && (
                                  <span className="text-gray-500 dark:text-gray-400 font-medium">
                                    {item.priority}
                                  </span>
                                )}
                              </div>
                              {item.milestone && (
                                <span className="shrink-0 text-gray-400 text-[10px]">
                                  {item.milestone}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Card Title */}
                          <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                            {item.title}
                          </div>

                          {/* Card Description */}
                          {item.description && (
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 m-0 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {/* Progress bar if present */}
                          {typeof item.progress === "number" && (
                            <div className="mt-0.5">
                              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-blue-600 dark:bg-blue-400 transition-all"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Card Footer */}
                          {(item.assignee || (item.tags && item.tags.length > 0) || item.href) && (
                            <div className="pt-1 mt-0.5 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400">
                              <div className="flex items-center gap-1 truncate max-w-[70%]">
                                {item.assignee && (
                                  <span className="truncate">{item.assignee}</span>
                                )}
                              </div>
                              {item.href && (
                                <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                                  Doc →
                                </span>
                              )}
                            </div>
                          )}
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
      )}
    </div>
  );
};

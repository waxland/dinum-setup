import React from "react";
import { SourceEntityType } from "../types";
import { getI18nStrings, SupportedLocale } from "../i18n";
import { SourceIcon } from "./SourceIcon";

export interface SourceSearchFilterChipsProps {
  categories: SourceEntityType[];
  activeCategory: SourceEntityType;
  onChange: (category: SourceEntityType) => void;
  locale?: SupportedLocale;
}

export const SourceSearchFilterChips: React.FC<SourceSearchFilterChipsProps> = ({
  categories,
  activeCategory,
  onChange,
  locale = "fr",
}) => {
  const i18n = getI18nStrings(locale);

  return (
    <div
      role="tablist"
      aria-label="Filtres par type de source"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "16px",
      }}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const label = i18n.placeholders[category]?.split("...")[0] || category; // Quick hack to get a name if not in i18n.categories

        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}

            onClick={(e) => {
              e.preventDefault();
              onChange(category);
            }}
            className={`fr-tag ${isActive ? "fr-tag--dismiss" : ""}`} // Just reusing some DSFR styling for active state if available or fallback
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              background: isActive
                ? "var(--background-action-high-blue-france, #000091)"
                : "var(--background-contrast-grey, #eeeeee)",
              color: isActive
                ? "var(--text-inverted-blue-france, #ffffff)"
                : "var(--text-default-grey, #161616)",
              border: "1px solid",
              borderColor: isActive
                ? "var(--border-action-high-blue-france, #000091)"
                : "var(--border-default-grey, #dddddd)",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            <SourceIcon type={category} size={14} color="currentColor" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

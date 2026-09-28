import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import React, { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useSourceSearch } from "../hooks/useSourceSearch";
import { getI18nStrings, type SupportedLocale } from "../i18n";
import type { SupportedCountry } from "../mockData";
import type { SourceSearchClient } from "../searchClient";
import { useSourceSearchConfiguration } from "../SourceSearchContext";
import {
  isSourceEntityType,
  SOURCE_ENTITY_TYPES,
  SourceEntityProps,
  SourceEntityType,
} from "../types";
import { SourceIcon } from "./SourceIcon";

interface SourceSearchPopoverProps {
  initialType?: SourceEntityType;
  initialCountry?: SupportedCountry;
  locale?: SupportedLocale;
  client?: SourceSearchClient;
  onSelect: (entity: SourceEntityProps) => void;
  onCancel: () => void;
}

export const SOURCE_COUNTRIES: SupportedCountry[] = ["fr", "de", "nl", "es", "eu", "ca"];

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({
  initialType = "law",
  initialCountry,
  locale: localeProp,
  client,
  onSelect,
  onCancel,
}) => {
  const configuration = useSourceSearchConfiguration();
  const locale = localeProp || configuration.locale || "fr";
  const i18n = getI18nStrings(locale);
  const [category, setCategory] = useState(initialType);
  const [countryOverride, setCountryOverride] = useState<SupportedCountry>();
  const country = countryOverride || initialCountry || configuration.country;
  const { query, setQuery, results, isLoading, error } = useSourceSearch({
    entityType: category,
    country,
    client: client || configuration.client,
  });
  const [selection, setSelection] = useState(0);
  const active = Math.min(selection, Math.max(0, results.length - 1));
  const input = useRef<HTMLInputElement>(null);
  const activeOption = useRef<HTMLDivElement>(null);
  const listId = useId();
  const statusId = useId();

  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    activeOption.current?.scrollIntoView?.({ block: "nearest" });
  }, [active, results]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const increment = event.key === "ArrowDown" ? 1 : -1;
      setSelection(results.length ? (active + increment + results.length) % results.length : 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = results[active];
      if (item) {
        onSelect(item);
      }
    }
  };

  return (
    <section
      contentEditable={false}
      aria-label={i18n.searchTitle}
      className="fr-p-2w"
      style={{
        width: "100%",
        maxWidth: 680,
        minWidth: 0,
        background: "var(--background-default-grey)",
        color: "var(--text-default-grey)",
        border: "1px solid var(--border-default-grey)",
        borderRadius: 4,
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onCancel();
        }
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Select
          label={i18n.categoryLabel}
          nativeSelectProps={{
            value: category,
            onChange: (event) => {
              if (isSourceEntityType(event.target.value)) {
                setCategory(event.target.value);
                setSelection(0);
              }
            },
          }}
        >
          {SOURCE_ENTITY_TYPES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          label={i18n.countryLabel}
          nativeSelectProps={{
            value: country,
            onChange: (event) => {
              const selected = SOURCE_COUNTRIES.find((value) => value === event.target.value);
              if (selected) {
                setCountryOverride(selected);
                setSelection(0);
              }
            },
          }}
        >
          {SOURCE_COUNTRIES.map((value) => (
            <option key={value} value={value}>
              {i18n.countryNames[value] || value}
            </option>
          ))}
        </Select>
      </div>
      <Input
        label={i18n.searchLabel}
        nativeInputProps={{
          ref: input,
          value: query,
          role: "combobox",
          "aria-expanded": true,
          placeholder: i18n.placeholders[category] || i18n.searchPlaceholder,
          "aria-controls": listId,
          "aria-autocomplete": "list",
          "aria-describedby": statusId,
          "aria-activedescendant": results[active] ? `${listId}-${active}` : undefined,
          onChange: (event) => {
            setQuery(event.target.value);
            setSelection(0);
          },
          onKeyDown: handleKeyDown,
        }}
      />
      <p id={statusId} role="status" aria-live="polite" className="fr-text--sm">
        {error ||
          (isLoading ? i18n.loading : !query.trim() ? "" : i18n.resultsCount(results.length))}
      </p>
      <div
        id={listId}
        role="listbox"
        aria-label={i18n.resultsLabel}
        aria-busy={isLoading}
        style={{ maxHeight: 260, overflowY: "auto" }}
      >
        {results.map((item, index) => (
          <div
            key={`${item.provider || item.entityType}:${item.sourceId}`}
            id={`${listId}-${index}`}
            ref={index === active ? activeOption : undefined}
            role="option"
            aria-selected={index === active}
            tabIndex={-1}
            onClick={() => onSelect(item)}
            onMouseEnter={() => setSelection(index)}
            className="fr-p-1w"
            style={{
              cursor: "pointer",
              overflowWrap: "anywhere",
              background: index === active ? "var(--background-contrast-info)" : undefined,
              borderBottom: "1px solid var(--border-default-grey)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <SourceIcon type={item.entityType} size={15} color="currentColor" />
              <strong style={{ minWidth: 0 }}>{item.title}</strong>
              {item.status && <span className="fr-badge fr-badge--sm">{item.status}</span>}
            </div>
            {item.subtitle && <div className="fr-text--sm fr-mb-0">{item.subtitle}</div>}
          </div>
        ))}
      </div>
      <div className="fr-mt-2w" style={{ display: "flex", gap: 8 }}>
        <Button
          priority="tertiary"
          iconId="fr-icon-close-line"
          title={i18n.closeSearch}
          onClick={onCancel}
        />
        {query && (
          <Button
            priority="tertiary"
            iconId="fr-icon-delete-line"
            title={i18n.clearSearch}
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          />
        )}
      </div>
    </section>
  );
};

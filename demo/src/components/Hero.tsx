import { SourceIcon, type SourceEntityType, type SupportedCountry } from "@suitenumerique/blocknote-sources";
import React from "react";
import type { DemoTranslations } from "../i18n/types";
import { COUNTRY_PRESETS } from "../presets.config";

interface HeroProps {
  currentCountry: SupportedCountry;
  onCountryChange: (country: SupportedCountry) => void;
  onInsert: (type: SourceEntityType) => void;
  t: DemoTranslations["hero"];
}

export const Hero: React.FC<HeroProps> = ({
  currentCountry,
  onCountryChange,
  onInsert,
  t,
}) => {
  const activePreset = COUNTRY_PRESETS[currentCountry];

  return (
    <section className="sober-hero" aria-labelledby="hero-title">
      <div className="sober-badge">{t.tag}</div>
      <h1 id="hero-title">{t.title}</h1>
      <p>{t.description}</p>

      <div className="sober-toolbar">
        <span className="sober-toolbar-label">{t.countryLabel}</span>
        <div className="sober-btn-group" role="radiogroup" aria-label={t.countryLabel}>
          {(Object.keys(COUNTRY_PRESETS) as SupportedCountry[]).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currentCountry === c}
              onClick={() => onCountryChange(c)}
              className={`sober-chip ${currentCountry === c ? "active" : ""}`}
            >
              <span aria-hidden="true">{COUNTRY_PRESETS[c].flag}</span>
              <span>{COUNTRY_PRESETS[c].name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sober-toolbar" style={{ marginTop: "8px" }}>
        <span className="sober-toolbar-label">{t.quickInsertLabel}</span>
        <div className="sober-btn-group">
          {activePreset.buttons.map((btn) => (
            <button
              key={btn.type + btn.label}
              type="button"
              onClick={() => onInsert(btn.type)}
              className="sober-chip sober-chip-sm"
              title={btn.desc}
            >
              <SourceIcon type={btn.type} size={13} color="currentColor" />
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

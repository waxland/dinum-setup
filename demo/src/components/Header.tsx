import React from "react";
import type { DemoLocale, DemoTranslations } from "../i18n/types";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onReset: () => void;
  currentLocale: DemoLocale;
  onLocaleChange: (locale: DemoLocale) => void;
  t: DemoTranslations["nav"];
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onReset,
  currentLocale,
  onLocaleChange,
  t,
}) => {
  return (
    <header className="sober-nav" role="banner">
      <div className="sober-nav-inner">
        <a href={`/${currentLocale}`} className="sober-brand" aria-label="Accueil La Suite Docs">
          <img
            src={isDark ? "/lasuite-dark.svg" : "/lasuite.svg"}
            alt=""
            aria-hidden="true"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="sober-brand-name">{t.title}</span>
        </a>

        <div className="sober-nav-actions">
          <a
            href="https://dinum-docs-waxlands-projects.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="sober-link"
          >
            {t.documentation}
          </a>
          <a
            href="https://github.com/waxland/dinum-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="sober-link"
          >
            {t.github}
          </a>

          <div className="sober-select-wrap">
            <label htmlFor="language-select" className="sr-only">
              {t.selectLanguage}
            </label>
            <select
              id="language-select"
              value={currentLocale}
              onChange={(e) => {
                if (e.target.value === 'fr' || e.target.value === 'en') { onLocaleChange(e.target.value); }
              }}
              className="sober-select"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="sober-btn"
            aria-label={isDark ? t.themeLight : t.themeDark}
          >
            {isDark ? "☀️ Clair" : "🌙 Sombre"}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="sober-btn sober-btn-danger"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </header>
  );
};

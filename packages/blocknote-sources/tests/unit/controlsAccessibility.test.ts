import { describe, expect, it } from "vitest";
import { getI18nStrings } from "../../src/i18n";
import { LOCALES } from "../../src/i18n/locales";

describe("UI Controls and Accessibility Attributes (R-06.03)", () => {
  it("defines displayModeLabel across all supported locales", () => {
    const supportedLocales = ["fr", "en", "de", "nl", "es"] as const;
    for (const locale of supportedLocales) {
      const i18n = getI18nStrings(locale);
      expect(i18n.displayModeLabel).toBeDefined();
      expect(i18n.displayModeLabel.length).toBeGreaterThan(0);
    }
  });

  it("provides correct French and English displayModeLabel strings", () => {
    expect(LOCALES.fr.displayModeLabel).toBe("Format d'affichage");
    expect(LOCALES.en.displayModeLabel).toBe("Display format");
  });
});

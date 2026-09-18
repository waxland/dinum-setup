import { enTranslations } from "./en";
import { frTranslations } from "./fr";
import type { DemoLocale, DemoTranslations } from "./types";

export * from "./en";
export * from "./fr";
export * from "./types";

export function getDemoTranslations(locale: DemoLocale): DemoTranslations {
  if (locale === "en") {
    return enTranslations;
  }
  return frTranslations;
}

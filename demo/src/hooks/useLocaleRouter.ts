import { useCallback, useEffect, useState } from "react";
import type { DemoLocale } from "../i18n/types";

export function useLocaleRouter(): [DemoLocale, (newLocale: DemoLocale) => void] {
  const getInitialLocale = (): DemoLocale => {
    if (typeof window === "undefined") {
      return "fr";
    }
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith("/en")) {
      return "en";
    }
    return "fr";
  };

  const [locale, setLocaleState] = useState<DemoLocale>(getInitialLocale);

  useEffect(() => {
    const handlePopState = () => {
      setLocaleState(getInitialLocale());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setLocale = useCallback((newLocale: DemoLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      const targetPath = `/${newLocale}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, "", targetPath);
      }
    }
  }, []);

  return [locale, setLocale];
}

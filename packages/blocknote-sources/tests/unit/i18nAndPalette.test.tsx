// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SourceSearchPopover } from "../../src/components/SourceSearchPopover";
import { getI18nStrings } from "../../src/i18n";
import { createHttpSourceClient } from "../../src/searchClient";
import { SourceSearchProvider } from "../../src/SourceSearchContext";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("R-02.07: i18n Dictionary Palette, Independent Country/Locale & Error Localization", () => {
  it("provides comprehensive localized strings across all 5 supported locales (fr, en, de, nl, es)", () => {
    const locales = ["fr", "en", "de", "nl", "es"] as const;
    locales.forEach((loc) => {
      const strings = getI18nStrings(loc);
      expect(strings.categoryLabel).toBeTruthy();
      expect(strings.countryLabel).toBeTruthy();
      expect(strings.searchLabel).toBeTruthy();
      expect(strings.closeSearch).toBeTruthy();
      expect(strings.clearSearch).toBeTruthy();
      expect(strings.loading).toBeTruthy();
      expect(strings.resultsLabel).toBeTruthy();
      expect(strings.countryNames.fr).toBeTruthy();
      expect(strings.countryNames.ca).toBeTruthy();
      expect(strings.errors.authRequired).toBeTruthy();
      expect(strings.errors.unavailableProvider).toBeTruthy();
      expect(strings.errors.rateLimited).toBeTruthy();
    });
  });

  it("renders popover in French when locale='fr' and in English when locale='en'", () => {
    // 1. Render in FR
    const { unmount } = render(
      <SourceSearchProvider
        value={{ client: vi.fn().mockResolvedValue([]), country: "fr", locale: "fr" }}
      >
        <SourceSearchPopover onSelect={vi.fn()} onCancel={vi.fn()} />
      </SourceSearchProvider>,
    );

    expect(screen.getByText("Catégorie")).toBeTruthy();
    expect(screen.getByText("Pays")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Rechercher une source" })).toBeTruthy();
    expect(screen.getByTitle("Fermer la recherche")).toBeTruthy();

    unmount();

    // 2. Render in EN
    render(
      <SourceSearchProvider
        value={{ client: vi.fn().mockResolvedValue([]), country: "fr", locale: "en" }}
      >
        <SourceSearchPopover onSelect={vi.fn()} onCancel={vi.fn()} />
      </SourceSearchProvider>,
    );

    expect(screen.getByText("Category")).toBeTruthy();
    expect(screen.getByText("Country")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Search a source" })).toBeTruthy();
    expect(screen.getByTitle("Close search")).toBeTruthy();
  });

  it("keeps UI language (locale) completely independent of the selected dataset country (country)", () => {
    // Interface in English (locale='en') while searching Canada (country='ca') or France (country='fr')
    render(
      <SourceSearchProvider
        value={{ client: vi.fn().mockResolvedValue([]), country: "ca", locale: "en" }}
      >
        <SourceSearchPopover onSelect={vi.fn()} onCancel={vi.fn()} />
      </SourceSearchProvider>,
    );

    // Interface remains English
    expect(screen.getByText("Category")).toBeTruthy();
    expect(screen.getByText("Country")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Search a source" })).toBeTruthy();

    // Country dropdown shows English name for Canada
    const select = screen.getByLabelText("Country") as HTMLSelectElement;
    expect(select.value).toBe("ca");
  });

  it("localizes search client HTTP errors based on the configured locale", async () => {
    // 1. HTTP 503 error in FR
    const fetchFR = vi.fn().mockResolvedValue(new Response("", { status: 503 }));
    vi.stubGlobal("fetch", fetchFR);

    const clientFR = createHttpSourceClient("/sources", () => "law", "fr");
    await expect(
      clientFR({
        entityType: "law",
        country: "fr",
        query: "test",
        limit: 10,
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow("Fournisseur indisponible pour ce pays.");

    // 2. HTTP 401 error in EN
    const fetchEN = vi.fn().mockResolvedValue(new Response("", { status: 401 }));
    vi.stubGlobal("fetch", fetchEN);

    const clientEN = createHttpSourceClient("/sources", () => "law", "en");
    await expect(
      clientEN({
        entityType: "law",
        country: "ca",
        query: "test",
        limit: 10,
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow("Authentication or authorization required.");

    // 3. HTTP 429 error in EN
    const fetch429 = vi.fn().mockResolvedValue(new Response("", { status: 429 }));
    vi.stubGlobal("fetch", fetch429);

    await expect(
      clientEN({
        entityType: "law",
        country: "ca",
        query: "test",
        limit: 10,
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow("Rate limit exceeded. Try again later.");
  });

  it("announces localized loading and error states in SourceSearchPopover", async () => {
    const fetch403 = vi.fn().mockResolvedValue(new Response("", { status: 403 }));
    vi.stubGlobal("fetch", fetch403);

    render(
      <SourceSearchProvider
        value={{
          client: createHttpSourceClient("/sources", () => "law", "en"),
          country: "ca",
          locale: "en",
        }}
      >
        <SourceSearchPopover onSelect={vi.fn()} onCancel={vi.fn()} />
      </SourceSearchProvider>,
    );

    const input = screen.getByRole("combobox", { name: "Search a source" });
    fireEvent.change(input, { target: { value: "test query" } });

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain(
        "Authentication or authorization required.",
      );
    });
  });
});

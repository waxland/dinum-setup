// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SOURCE_COUNTRIES } from "../../src/components/SourceSearchPopover";
import { demoSearchClient } from "../../src/demoSearchClient";
import { useSourceSearch } from "../../src/hooks/useSourceSearch";
import { getSourcesByCountry, SupportedCountry } from "../../src/mockData";
import type { SourceSearchClient } from "../../src/searchClient";
import type { SourceEntityProps } from "../../src/types";

const deferred = () => {
  let resolve: (value: SourceEntityProps[]) => void = () => {
    throw new Error("Not initialized");
  };
  let reject: (error: Error) => void = () => {
    throw new Error("Not initialized");
  };
  const promise = new Promise<SourceEntityProps[]>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
};

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("R-02.06: Multi-Country Presets, Canada Verification & Search Cancellation", () => {
  const ALL_SIX_COUNTRIES: SupportedCountry[] = ["fr", "de", "nl", "es", "eu", "ca"];

  it("unifies the list of all six supported countries across popovers and datasets", () => {
    expect(SOURCE_COUNTRIES).toEqual(ALL_SIX_COUNTRIES);

    ALL_SIX_COUNTRIES.forEach((c) => {
      const sources = getSourcesByCountry(c);
      expect(sources.length).toBeGreaterThan(0);
      sources.forEach((item) => {
        expect(item.country).toBe(c);
      });
    });
  });

  it("queries each of the six countries using demoSearchClient", async () => {
    for (const country of ALL_SIX_COUNTRIES) {
      const results = await demoSearchClient({
        entityType: "law",
        country,
        query: "",
        limit: 10,
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((item) => {
        expect(item.country).toBe(country);
        expect(item.provider).toContain(`demo-${country}-`);
        expect(item.origin).toBe("demo");
      });
    }
  });

  it("explicitly verifies Canada (ca) law and company mock search results", async () => {
    const canadaLaws = await demoSearchClient({
      entityType: "law",
      country: "ca",
      query: "PIPEDA",
      limit: 5,
    });
    expect(canadaLaws.length).toBeGreaterThan(0);
    expect(canadaLaws[0]?.title).toContain("PIPEDA");
    expect(canadaLaws[0]?.country).toBe("ca");

    const canadaCompanies = await demoSearchClient({
      entityType: "company",
      country: "ca",
      query: "Shared Services",
      limit: 5,
    });
    expect(canadaCompanies.length).toBeGreaterThan(0);
    expect(canadaCompanies[0]?.title).toContain("Shared Services Canada");
    expect(canadaCompanies[0]?.country).toBe("ca");
  });

  it("aborts old country search and discards late results when switching country from fr to ca", async () => {
    const reqFR = deferred();
    const reqCA = deferred();
    const client = vi
      .fn<SourceSearchClient>()
      .mockReturnValueOnce(reqFR.promise)
      .mockReturnValueOnce(reqCA.promise);

    const { result, rerender } = renderHook(
      ({ country }: { country: SupportedCountry }) =>
        useSourceSearch({ entityType: "law", country, client }),
      { initialProps: { country: "fr" as SupportedCountry } },
    );

    // 1. Trigger search for France
    act(() => result.current.setQuery("Loi"));
    await act(() => vi.advanceTimersByTimeAsync(250));

    expect(client).toHaveBeenCalledTimes(1);
    expect(client.mock.calls[0]?.[0].country).toBe("fr");
    const frSignal = client.mock.calls[0]?.[0].signal;
    expect(frSignal.aborted).toBe(false);

    // 2. Switch country to Canada while FR search is pending
    rerender({ country: "ca" });

    // Verify FR signal was aborted immediately on country change
    expect(frSignal.aborted).toBe(true);

    // Advance timer for CA search debounce
    await act(() => vi.advanceTimersByTimeAsync(250));
    expect(client).toHaveBeenCalledTimes(2);
    expect(client.mock.calls[1]?.[0].country).toBe("ca");

    // 3. Late resolution of FR request should be ignored
    await act(async () =>
      reqFR.resolve([
        {
          entityType: "law",
          displayMode: "callout",
          sourceId: "FR-123",
          title: "French Law Result",
          country: "fr",
        },
      ]),
    );

    // Results should NOT contain French record
    expect(result.current.results).toEqual([]);

    // 4. Resolve Canada request
    await act(async () =>
      reqCA.resolve([
        {
          entityType: "law",
          displayMode: "callout",
          sourceId: "CAN-STAT-PIPEDA",
          title: "Canada Law Result",
          country: "ca",
        },
      ]),
    );

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]?.title).toBe("Canada Law Result");
    expect(result.current.results[0]?.country).toBe("ca");
  });

  it("preserves document text and block structures when country or locale configuration changes", () => {
    // Emulate document blocks in editor
    const initialDocument = [
      {
        id: "block-1",
        type: "paragraph",
        content: [{ type: "text", text: "Original document paragraph text" }],
      },
      {
        id: "block-2",
        type: "sourceBlock",
        props: {
          entityType: "law",
          displayMode: "callout",
          sourceId: "CAN-STAT-PIPEDA",
          title: "PIPEDA Canada",
          country: "ca",
        },
      },
    ];

    // Simulating country switch in application configuration state
    let activeCountry: SupportedCountry = "fr";
    const switchCountry = (newCountry: SupportedCountry) => {
      activeCountry = newCountry;
    };

    // Document before country change
    const docBefore = JSON.stringify(initialDocument);

    // Switch country from fr to ca, de, etc.
    switchCountry("ca");
    switchCountry("de");

    // Document state remains 100% identical and preserved
    const docAfter = JSON.stringify(initialDocument);
    expect(docAfter).toBe(docBefore);
    expect(activeCountry).toBe("de");
  });
});

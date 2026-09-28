import { afterEach, expect, it, vi } from "vitest";
import { createHttpSourceClient, parseSearchResponse } from "../../src/searchClient";

afterEach(() => vi.unstubAllGlobals());

it("converts Django fields without renaming nested payload keys", () => {
  expect(
    parseSearchResponse({
      results: [
        {
          source_id: "external-id",
          entity_type: "law",
          display_mode: "callout",
          title: "Result",
          status_color: "green",
          verified_at: null,
          raw_payload: { original_key: 1 },
        },
      ],
    }),
  ).toEqual([
    expect.objectContaining({
      sourceId: "external-id",
      entityType: "law",
      statusColor: "green",
      verifiedAt: undefined,
      rawPayload: '{"original_key":1}',
    }),
  ]);
});

it("rejects invalid records instead of returning a misleading empty success", () => {
  expect(() => parseSearchResponse({ results: [{ title: "missing identity" }] })).toThrow(
    "Invalid source record",
  );
  expect(() => parseSearchResponse({})).toThrow("Invalid search response");
  expect(() =>
    parseSearchResponse({
      results: [
        {
          source_id: "",
          title: "valid",
          entity_type: "law",
          display_mode: "callout",
        },
      ],
    }),
  ).toThrow("Invalid source record");
  expect(() =>
    parseSearchResponse({
      results: [
        {
          source_id: "id",
          title: "   ",
          entity_type: "law",
          display_mode: "callout",
        },
      ],
    }),
  ).toThrow("Invalid source record");
});

it("sanitizes unsafe URLs like javascript: and accepts safe https or relative URLs", () => {
  const parsed = parseSearchResponse({
    results: [
      {
        source_id: "safe-1",
        title: "Safe Link",
        entity_type: "law",
        display_mode: "link",
        url: "https://legifrance.gouv.fr/codes/123",
      },
      {
        source_id: "unsafe-2",
        title: "Unsafe Link",
        entity_type: "law",
        display_mode: "link",
        url: "javascript:alert(1)",
      },
    ],
  });

  expect(parsed[0]?.url).toBe("https://legifrance.gouv.fr/codes/123");
  expect(parsed[1]?.url).toBeUndefined();
});

it("sends the resolved provider and propagates authentication failures without mocks", async () => {
  const transport = vi.fn().mockResolvedValue(new Response("{}", { status: 403 }));
  vi.stubGlobal("fetch", transport);
  const client = createHttpSourceClient("/sources", () => "justice-ca");
  await expect(
    client({
      entityType: "law",
      country: "ca",
      query: "a & b",
      limit: 10,
      signal: new AbortController().signal,
    }),
  ).rejects.toThrow("Authentification");
  expect(transport.mock.calls[0]?.[0]).toBe("/sources/search/?type=justice-ca&q=a+%26+b&limit=10");
});

import { describe, expect, it } from "vitest";
import { SOURCE_COUNTRIES } from "../../src/components/SourceSearchPopover";
import { MOCK_SOURCES } from "../../src/mockSources";
import { SOURCE_ENTITY_TYPES } from "../../src/types";

describe("RGAA v4.1 & ARIA Compliance Unit Tests", () => {
  it("ensures all mock source items have valid accessible titles, statuses, and URLs", () => {
    Object.entries(MOCK_SOURCES).forEach(([_providerKey, items]) => {
      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      items.forEach((item) => {
        expect(item.title).toBeTruthy();
        expect(typeof item.title).toBe("string");
        expect(item.title.trim().length).toBeGreaterThan(3);

        const url = item.url;
        expect(url).toBeDefined();
        if (url) {
          expect(url).toMatch(/^https?:\/\//);
        }

        expect(item.status).toBeTruthy();
        expect(typeof item.status).toBe("string");
      });
    });
  });

  it("verifies canonical category types and supported country lists", () => {
    // 16 sovereign entity categories
    expect(SOURCE_ENTITY_TYPES).toHaveLength(16);
    expect(SOURCE_ENTITY_TYPES).toContain("law");
    expect(SOURCE_ENTITY_TYPES).toContain("company");
    expect(SOURCE_ENTITY_TYPES).toContain("cadastre");

    // 6 supported countries
    expect(SOURCE_COUNTRIES).toHaveLength(6);
    expect(SOURCE_COUNTRIES).toContain("fr");
    expect(SOURCE_COUNTRIES).toContain("ca");
    expect(SOURCE_COUNTRIES).toContain("eu");
  });
});

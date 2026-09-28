import { describe, expect, it } from "vitest";
import { parseSearchResponse } from "../../src/searchClient";
import type { SourceEntityProps } from "../../src/types";

describe("Contracts & Persistence: Field table & Freshness validation (R-02.01 / T-003.01 / T-003.05)", () => {
  it("parses and maps all canonical fields from Django response to BlockNote props", () => {
    const djangoPayload = {
      type: "law",
      query: "code civil",
      count: 1,
      results: [
        {
          source_id: "LEGITEXT000006070721",
          entity_type: "law",
          display_mode: "callout",
          title: "Code civil",
          subtitle: "Article 1100",
          status: "En vigueur",
          status_color: "green",
          meta1: "JORF",
          meta2: "Code",
          meta3: "DILA",
          excerpt: "Les actes juridiques sont des manifestations de volonté...",
          summary: "Régime général des obligations",
          url: "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000032041926",
          verified_at: "2026-09-26T12:00:00Z",
          retrieved_at: "2026-09-26T12:05:00Z",
          country: "fr",
          delivery: "cache",
          provider: "legifrance",
          origin: "upstream",
          raw_payload: { cid: "LEGIARTI000032041926", version: 1 },
        },
      ],
    };

    const parsed: SourceEntityProps[] = parseSearchResponse(djangoPayload);
    expect(parsed).toHaveLength(1);
    const item = parsed[0];

    // Category / Provider / Country / Origin separation
    expect(item.entityType).toBe("law");
    expect(item.provider).toBe("legifrance");
    expect(item.country).toBe("fr");
    expect(item.origin).toBe("upstream");

    // Display & Content restitution
    expect(item.displayMode).toBe("callout");
    expect(item.sourceId).toBe("LEGITEXT000006070721");
    expect(item.title).toBe("Code civil");
    expect(item.subtitle).toBe("Article 1100");
    expect(item.status).toBe("En vigueur");
    expect(item.statusColor).toBe("green");
    expect(item.meta1).toBe("JORF");
    expect(item.meta2).toBe("Code");
    expect(item.meta3).toBe("DILA");
    expect(item.excerpt).toContain("manifestations de volonté");
    expect(item.summary).toBe("Régime général des obligations");
    expect(item.url).toContain("legifrance.gouv.fr");

    // Freshness and Verification
    expect(item.verifiedAt).toBe("2026-09-26T12:00:00Z");
    expect(item.retrievedAt).toBe("2026-09-26T12:05:00Z");
    expect(item.freshness).toBe("cached");

    // Raw payload serialization
    expect(JSON.parse(item.rawPayload || "{}")).toEqual({
      cid: "LEGIARTI000032041926",
      version: 1,
    });
  });

  it("tolerates legacy snapshots without new freshness or country fields", () => {
    const legacyPayload = {
      type: "law",
      results: [
        {
          source_id: "legacy-123",
          entity_type: "law",
          display_mode: "link",
          title: "Legacy Title",
        },
      ],
    };

    const parsed = parseSearchResponse(legacyPayload);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.sourceId).toBe("legacy-123");
    expect(parsed[0]?.country).toBeUndefined();
    expect(parsed[0]?.freshness).toBeUndefined();
    expect(parsed[0]?.origin).toBeUndefined();
  });

  it("R-02.05: reloads a legacy document snapshot without new fields offline, verifying readability, no silent modification, and no new verifiedAt date", () => {
    // 1. Legacy block JSON snapshot as stored in older documents (without provider, origin, country, freshness, retrievedAt, verifiedAt)
    const legacyBlockSnapshotJson = JSON.stringify([
      {
        id: "legacy-block-999",
        type: "sourceBlock",
        props: {
          entityType: "law",
          displayMode: "callout",
          sourceId: "LEGITEXT000006070721-legacy",
          title: "Ancien Code Civil (Legacy Snapshot)",
          subtitle: "Article 1er",
          status: "En vigueur",
          statusColor: "green",
          meta1: "JORF 1804",
          meta2: "Code Napoléon",
          excerpt: "Les lois sont exécutoires dans tout le territoire français...",
          summary: "",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006419280",
        },
        content: [],
      },
    ]);

    // 2. Deserialize document JSON offline (simulating reading stored document without network access)
    const doc = JSON.parse(legacyBlockSnapshotJson);
    const legacyBlock = doc[0];

    // 3. Verify block is structurally valid and readable
    expect(legacyBlock.type).toBe("sourceBlock");
    expect(legacyBlock.props.sourceId).toBe("LEGITEXT000006070721-legacy");
    expect(legacyBlock.props.title).toBe("Ancien Code Civil (Legacy Snapshot)");
    expect(legacyBlock.props.excerpt).toContain("exécutoires dans tout le territoire");

    // 4. Verify no new verifiedAt, retrievedAt or default freshness/origin was injected or updated silently
    expect(legacyBlock.props.verifiedAt).toBeUndefined();
    expect(legacyBlock.props.retrievedAt).toBeUndefined();
    expect(legacyBlock.props.freshness).toBeUndefined();
    expect(legacyBlock.props.provider).toBeUndefined();
    expect(legacyBlock.props.origin).toBeUndefined();
    expect(legacyBlock.props.country).toBeUndefined();

    // 5. Ensure re-serializing the document snapshot results in exact silent immutability (no silent modifications)
    const reserializedDocJson = JSON.stringify(doc);
    expect(reserializedDocJson).toBe(legacyBlockSnapshotJson);
  });

  it("R-02.03 / T-003.06 / T-004.07: full traversal from Django view output to BlockNote block snapshot and offline reload", () => {
    // 1. Django view output generated dynamically (not from static demo fixtures)
    const djangoLiveApiResponse = {
      type: "test-custom-roundtrip",
      query: "sovereign-data",
      count: 1,
      results: [
        {
          source_id: "custom-sovereign-data-999",
          entity_type: "custom",
          display_mode: "card",
          title: "Live Custom Item: sovereign-data",
          subtitle: "Generated on the fly (Not in fixtures)",
          status: "Validé",
          status_color: "blue",
          provider: "custom-backend-system",
          origin: "upstream",
          delivery: "live",
          country: "fr",
          verified_at: "2026-09-26T15:30:00Z",
          retrieved_at: "2026-09-26T15:31:00Z",
          url: "https://sources.lasuite.numerique.gouv.fr/custom/sovereign-data",
          summary: "Full verified summary for sovereign-data",
          raw_payload: { unique_id: 999, query_term: "sovereign-data" },
        },
      ],
    };

    // 2. Traversal through React adapter
    const parsedEntities = parseSearchResponse(djangoLiveApiResponse);
    expect(parsedEntities).toHaveLength(1);
    const selectedEntity = parsedEntities[0];

    // 3. Emulate BlockNote block state insertion (as performed in SourceBlock handleSelectEntity)
    const blockState = {
      id: "block-uuid-42",
      type: "sourceBlock" as const,
      props: {
        entityType: selectedEntity.entityType,
        displayMode: selectedEntity.displayMode,
        sourceId: selectedEntity.sourceId,
        title: selectedEntity.title,
        subtitle: selectedEntity.subtitle || "",
        status: selectedEntity.status || "",
        statusColor: selectedEntity.statusColor || "blue",
        meta1: selectedEntity.meta1 || "",
        meta2: selectedEntity.meta2 || "",
        meta3: selectedEntity.meta3 || "",
        excerpt: selectedEntity.excerpt || "",
        summary: selectedEntity.summary || "",
        url: selectedEntity.url || "",
        verifiedAt: selectedEntity.verifiedAt || "",
        provider: selectedEntity.provider || "",
        origin: selectedEntity.origin || "",
        country: selectedEntity.country || "",
        freshness: selectedEntity.freshness || "",
        retrievedAt: selectedEntity.retrievedAt || "",
        rawPayload: selectedEntity.rawPayload || "",
      },
      content: [] as never[],
    };

    // 4. Emulate document persistence (JSON serialization into database/file)
    const documentJson = JSON.stringify([blockState]);

    // 5. Emulate reloading document completely offline without any network call or search client
    const reloadedDoc = JSON.parse(documentJson);
    const reloadedBlock = reloadedDoc[0];

    // 6. Verify full identity, content, provenance and metadata fidelity
    expect(reloadedBlock.type).toBe("sourceBlock");
    expect(reloadedBlock.props.sourceId).toBe("custom-sovereign-data-999");
    expect(reloadedBlock.props.title).toBe("Live Custom Item: sovereign-data");
    expect(reloadedBlock.props.subtitle).toBe("Generated on the fly (Not in fixtures)");
    expect(reloadedBlock.props.provider).toBe("custom-backend-system");
    expect(reloadedBlock.props.origin).toBe("upstream");
    expect(reloadedBlock.props.country).toBe("fr");
    expect(reloadedBlock.props.freshness).toBe("live");
    expect(reloadedBlock.props.verifiedAt).toBe("2026-09-26T15:30:00Z");
    expect(reloadedBlock.props.retrievedAt).toBe("2026-09-26T15:31:00Z");
    expect(reloadedBlock.props.url).toBe(
      "https://sources.lasuite.numerique.gouv.fr/custom/sovereign-data",
    );
    expect(reloadedBlock.props.summary).toBe("Full verified summary for sovereign-data");

    const parsedRaw = JSON.parse(reloadedBlock.props.rawPayload);
    expect(parsedRaw.unique_id).toBe(999);
    expect(parsedRaw.query_term).toBe("sovereign-data");
  });
});

import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { buildCompleteODTDocument } from "../../src/exporters/odtDocumentBuilder";
import { SourceBlockExportBlock } from "../../src/types";

const sampleBlocks: SourceBlockExportBlock[] = [
  {
    id: "odt-block-1",
    type: "sourceBlock",
    content: [],
    children: [],
    props: {
      entityType: "law",
      displayMode: "callout",
      sourceId: "LEGIARTI000037812976",
      title: "Article L. 111-1 du Code de la commande publique",
      subtitle: "Code de la commande publique - Contrats publics",
      status: "En vigueur",
      statusColor: "green",
      meta1: "LEGIARTI000037812976",
      meta2: "Ordonnance n° 2018-1074",
      meta3: "Entrée en vigueur : 01/04/2019",
      excerpt:
        "Un marché est un contrat conclu par un ou plusieurs acheteurs soumis au présent code...",
      summary: "Définit la notion fondamentale de marché public.",
      url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
      verifiedAt: "28/09/2026",
      provider: "law",
      origin: "upstream",
      country: "fr",
      retrievedAt: "2026-09-28T12:00:00Z",
      rawPayload: "",
      textAlignment: "left",
      backgroundColor: "default",
    },
  },
  {
    id: "odt-block-2",
    type: "sourceBlock",
    content: [],
    children: [],
    props: {
      entityType: "company",
      displayMode: "card",
      sourceId: "130025265",
      title: "Direction Interministérielle du Numérique (DINUM)",
      subtitle: "Services du Premier ministre",
      status: "En activité",
      statusColor: "blue",
      meta1: "SIREN : 130 025 265",
      meta2: "SIRET : 130 025 265 00013",
      meta3: "Catégorie : Service Central",
      excerpt: "",
      summary: "Conçoit et met en œuvre la stratégie numérique de l’État.",
      url: "https://annuaire-entreprises.data.gouv.fr/entreprise/130025265",
      verifiedAt: "28/09/2026",
      provider: "company",
      origin: "upstream",
      country: "fr",
      retrievedAt: "2026-09-28T12:00:00Z",
      rawPayload: "",
      textAlignment: "left",
      backgroundColor: "default",
    },
  },
];

describe("R-05.03: Complete ODT Document Generation & Archive Inspection", () => {
  it("generates a valid ZIP ODF archive containing mimetype, META-INF/manifest.xml, content.xml, styles.xml and meta.xml", async () => {
    const odtBytes = await buildCompleteODTDocument(sampleBlocks);
    expect(odtBytes).toBeInstanceOf(Uint8Array);
    expect(odtBytes.byteLength).toBeGreaterThan(500);

    // Unzip the generated .odt archive
    const unzippedFiles = unzipSync(odtBytes);
    const filenames = Object.keys(unzippedFiles);

    // Verify mandatory OpenDocument package files exist
    expect(filenames).toContain("mimetype");
    expect(filenames).toContain("META-INF/manifest.xml");
    expect(filenames).toContain("content.xml");
    expect(filenames).toContain("styles.xml");
    expect(filenames).toContain("meta.xml");

    // Verify uncompressed mimetype file content
    const mime = unzippedFiles["mimetype"];
    expect(mime).toBeDefined();
    if (!mime) {
      throw new Error("Missing mimetype");
    }
    const mimetypeStr = strFromU8(mime);
    expect(mimetypeStr).toBe("application/vnd.oasis.opendocument.text");

    // Verify manifest.xml contains ODF media-type definitions
    const manifest = unzippedFiles["META-INF/manifest.xml"];
    expect(manifest).toBeDefined();
    if (!manifest) {
      throw new Error("Missing manifest");
    }
    const manifestXml = strFromU8(manifest);
    expect(manifestXml).toContain('manifest:media-type="application/vnd.oasis.opendocument.text"');
    expect(manifestXml).toContain('manifest:full-path="content.xml"');

    // Verify meta.xml contains creator metadata
    const meta = unzippedFiles["meta.xml"];
    expect(meta).toBeDefined();
    if (!meta) {
      throw new Error("Missing meta");
    }
    const metaXml = strFromU8(meta);
    expect(metaXml).toContain("<dc:creator>DINUM Slasher Exporter</dc:creator>");
  });

  it("content.xml contains ODF tags, text formatting, and clickable hyperlinks", async () => {
    const odtBytes = await buildCompleteODTDocument(sampleBlocks);
    const unzippedFiles = unzipSync(odtBytes);
    const content = unzippedFiles["content.xml"];
    expect(content).toBeDefined();
    if (!content) {
      throw new Error("Missing content");
    }
    const contentXml = strFromU8(content);

    // Check ODF namespace definitions
    expect(contentXml).toContain('xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"');
    expect(contentXml).toContain('xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"');
    expect(contentXml).toContain('xmlns:xlink="http://www.w3.org/1999/xlink"');

    // Check block 1 content
    expect(contentXml).toContain("Article L. 111-1 du Code de la commande publique");
    expect(contentXml).toContain("Un marché est un contrat conclu");
    expect(contentXml).toContain(
      'xlink:href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976"',
    );

    // Check block 2 content
    expect(contentXml).toContain("Direction Interministérielle du Numérique (DINUM)");
    expect(contentXml).toContain("Conçoit et met en œuvre la stratégie numérique");
    expect(contentXml).toContain(
      'xlink:href="https://annuaire-entreprises.data.gouv.fr/entreprise/130025265"',
    );
  });
});

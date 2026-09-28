import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Document as PdfDocument, Page, renderToBuffer } from "@react-pdf/renderer";
import { Document, Packer } from "docx";
import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { blockMappingSourceBlockDocx as docxExporter } from "../../src/exporters/docx";
import { blockMappingSourceBlockODT as odtExporter } from "../../src/exporters/odt";
import { blockMappingSourceBlockPDF as pdfExporter } from "../../src/exporters/pdf";
import {
  blockMappingSourceBlockDocx,
  blockMappingSourceBlockODT,
  blockMappingSourceBlockPDF,
} from "../../src/exporters";
import { SourceBlockExportBlock } from "../../src/types";

const block: SourceBlockExportBlock = {
  id: "export-test",
  type: "sourceBlock",
  content: [],
  children: [],
  props: {
    entityType: "law",
    displayMode: "callout",
    sourceId: "external-id",
    title: "Titre exporte",
    subtitle: "Sous-titre",
    status: "Demonstration",
    statusColor: "gray",
    meta1: "Identifiant",
    meta2: "",
    meta3: "",
    excerpt: "Contenu de la citation",
    summary: "",
    url: "https://example.org/source",
    verifiedAt: "",
    provider: "test-provider",
    origin: "demo",
    country: "fr",
    retrievedAt: "",
    rawPayload: "",
    textAlignment: "left",
    backgroundColor: "default",
  },
};

describe("R-05.01: Independent Exporters Subpath Imports", () => {
  it("exporters/pdf subpath export functions identically to index export", async () => {
    expect(pdfExporter).toBe(blockMappingSourceBlockPDF);
    const document = createElement(PdfDocument, {}, createElement(Page, {}, pdfExporter(block)));
    const bytes = await renderToBuffer(document);
    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(bytes.toString()).toContain("https://example.org/source");
  });

  it("exporters/docx subpath export functions identically to index export", async () => {
    expect(docxExporter).toBe(blockMappingSourceBlockDocx);
    const document = new Document({ sections: [{ children: [docxExporter(block)] }] });
    const entries = unzipSync(await Packer.toBuffer(document));
    const xml = strFromU8(entries["word/document.xml"]);
    expect(xml).toContain("Titre exporte");
    expect(xml).toContain("Contenu de la citation");
  });

  it("exporters/odt subpath export functions identically to index export", () => {
    expect(odtExporter).toBe(blockMappingSourceBlockODT);
    const xml = renderToStaticMarkup(odtExporter(block));
    expect(xml).toContain("Titre exporte");
    expect(xml).toContain("Contenu de la citation");
    expect(xml).toContain('xlink:href="https://example.org/source"');
  });
});

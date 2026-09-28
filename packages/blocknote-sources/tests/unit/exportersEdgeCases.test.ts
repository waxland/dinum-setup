import { createElement } from "react";
import { Document as PdfDocument, Page, renderToBuffer } from "@react-pdf/renderer";
import { Document, Packer } from "docx";
import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { blockMappingSourceBlockDocx as docxExporter } from "../../src/exporters/docx";
import { buildCompleteODTDocument } from "../../src/exporters/odtDocumentBuilder";
import { blockMappingSourceBlockPDF as pdfExporter } from "../../src/exporters/pdf";
import { SourceBlockExportBlock } from "../../src/types";

const complexBlockWithAccents: SourceBlockExportBlock = {
  id: "export-edge-case-1",
  type: "sourceBlock",
  content: [],
  children: [],
  props: {
    entityType: "law",
    displayMode: "callout",
    sourceId: "LEGIARTI000037812976-ACCENTS",
    title:
      "Article L. 111-1 du Code de la commande publique relatives aux règles applicables aux acheteurs publics et à l’égalité de traitement",
    subtitle:
      "Code de la commande publique — Chapitre Ier : Principes fondamentaux de la commande publique & dispositions générales",
    status: "En vigueur (Certifié & Validé)",
    statusColor: "green",
    meta1: "JORF n°0282 du 5 décembre 2018",
    meta2: "Ordonnance n° 2018-1074 du 26 novembre 2018 portant partie législative",
    meta3: "Entrée en vigueur : 1er avril 2019 · République Française",
    excerpt:
      "« Les acheteurs respectent le principe d’égalité de traitement des candidats à l’attribution d’un contrat de la commande publique. Ils veillent à la liberté d’accès et à la transparence des procédures. »",
    summary:
      "Définit les trois grands principes constitutionnels de la commande publique française : liberté d’accès, égalité de traitement et transparence.",
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
};

const minimalBlockWithMissingFields: SourceBlockExportBlock = {
  id: "export-edge-case-2",
  type: "sourceBlock",
  content: [],
  children: [],
  props: {
    entityType: "custom",
    displayMode: "card",
    sourceId: "MINIMAL-001",
    title: "Minimal Source Title Only",
    subtitle: "",
    status: "",
    statusColor: "gray",
    meta1: "",
    meta2: "",
    meta3: "",
    excerpt: "",
    summary: "",
    url: "",
    verifiedAt: "",
    provider: "",
    origin: "",
    country: "",
    retrievedAt: "",
    rawPayload: "",
    textAlignment: "left",
    backgroundColor: "default",
  },
};

describe("R-05.04: Multiformat Document Exports (PDF / DOCX / ODT Edge Cases)", () => {
  describe("PDF Export (@react-pdf/renderer)", () => {
    it("generates a valid binary PDF document with complex accents and long titles", async () => {
      const doc = createElement(
        PdfDocument,
        {},
        createElement(Page, {}, pdfExporter(complexBlockWithAccents)),
      );
      const pdfBuffer = await renderToBuffer(doc);
      expect(pdfBuffer.subarray(0, 5).toString()).toBe("%PDF-");
      const pdfText = pdfBuffer.toString("latin1");
      expect(pdfText).toContain(
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
      );
      expect(pdfBuffer.byteLength).toBeGreaterThan(1500);
    });

    it("renders PDF cleanly when optional fields (subtitle, status, meta, url, excerpt) are missing", async () => {
      const doc = createElement(
        PdfDocument,
        {},
        createElement(Page, {}, pdfExporter(minimalBlockWithMissingFields)),
      );
      const pdfBuffer = await renderToBuffer(doc);
      expect(pdfBuffer.subarray(0, 5).toString()).toBe("%PDF-");
      expect(pdfBuffer.byteLength).toBeGreaterThan(800);
    });
  });

  describe("Word DOCX Export (docx library)", () => {
    it("generates a valid DOCX document XML structure with accents and external hyperlinks", async () => {
      const doc = new Document({
        sections: [{ children: [docxExporter(complexBlockWithAccents)] }],
      });
      const buffer = await Packer.toBuffer(doc);
      const unzipped = unzipSync(buffer);

      const wordDoc = unzipped["word/document.xml"];
      expect(wordDoc).toBeDefined();
      if (!wordDoc) {
        throw new Error("Missing word/document.xml");
      }
      const docXml = strFromU8(wordDoc);
      expect(docXml).toContain("Article L. 111-1 du Code de la commande publique");
      expect(docXml).toContain("République Française");
      expect(docXml).toContain("Consulter la source officielle");

      const wordRels = unzipped["word/_rels/document.xml.rels"];
      expect(wordRels).toBeDefined();
      if (!wordRels) {
        throw new Error("Missing word/_rels/document.xml.rels");
      }
      const relsXml = strFromU8(wordRels);
      expect(relsXml).toContain(
        "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
      );
    });

    it("renders DOCX without error when optional fields are missing", async () => {
      const doc = new Document({
        sections: [{ children: [docxExporter(minimalBlockWithMissingFields)] }],
      });
      const buffer = await Packer.toBuffer(doc);
      const unzipped = unzipSync(buffer);
      const wordDoc = unzipped["word/document.xml"];
      expect(wordDoc).toBeDefined();
      if (!wordDoc) {
        throw new Error("Missing word/document.xml");
      }
      const docXml = strFromU8(wordDoc);
      expect(docXml).toContain("Minimal Source Title Only");
    });
  });

  describe("LibreOffice ODT Export (ODF Zip archive)", () => {
    it("generates a complete ODT ODF ZIP package with accents and valid XML escaping", async () => {
      const odtBytes = await buildCompleteODTDocument([
        complexBlockWithAccents,
        minimalBlockWithMissingFields,
      ]);
      const unzipped = unzipSync(odtBytes);

      const content = unzipped["content.xml"];
      expect(content).toBeDefined();
      if (!content) {
        throw new Error("Missing content.xml");
      }
      const contentXml = strFromU8(content);
      expect(contentXml).toContain("Article L. 111-1 du Code de la commande publique");
      expect(contentXml).toContain("République Française");
      expect(contentXml).toContain("« Les acheteurs respectent le principe d’égalité");
      expect(contentXml).toContain(
        'xlink:href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976"',
      );

      // Minimal block with missing fields
      expect(contentXml).toContain("Minimal Source Title Only");
    });
  });
});

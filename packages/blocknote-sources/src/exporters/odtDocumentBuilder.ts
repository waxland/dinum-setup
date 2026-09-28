import { renderToStaticMarkup } from "react-dom/server";
import { zipSync } from "fflate";
import { SourceBlockExportBlock } from "../types";
import { blockMappingSourceBlockODT } from "./sourceBlockODT";

/** Minimal ODF OpenDocument Text (.odt) archive packager for testing and native export verification. */
export async function buildCompleteODTDocument(
  blocks: SourceBlockExportBlock[],
): Promise<Uint8Array> {
  const contentXml = generateContentXml(blocks);
  const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.3">
  <manifest:file-entry manifest:full-path="/" manifest:version="1.3" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" office:version="1.3">
  <office:styles>
    <style:default-style style:family="paragraph">
      <style:paragraph-properties fo:hyphenation-ladder-count="no-limit" style:text-autospace="ideograph-alpha"/>
    </style:default-style>
  </office:styles>
</office:document-styles>`;

  const metaXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" office:version="1.3">
  <office:meta>
    <dc:title>Document Slasher Sources Souveraines</dc:title>
    <dc:creator>DINUM Slasher Exporter</dc:creator>
    <meta:generator>@suitenumerique/blocknote-sources</meta:generator>
  </office:meta>
</office:document-meta>`;

  const mimetype = new TextEncoder().encode("application/vnd.oasis.opendocument.text");

  const files: Record<string, Uint8Array> = {
    mimetype: mimetype,
    "META-INF/manifest.xml": new TextEncoder().encode(manifestXml),
    "content.xml": new TextEncoder().encode(contentXml),
    "styles.xml": new TextEncoder().encode(stylesXml),
    "meta.xml": new TextEncoder().encode(metaXml),
  };

  return zipSync(files, { level: 0 });
}

function generateContentXml(blocks: SourceBlockExportBlock[]): string {
  const paragraphsMarkup = blocks
    .map((b) => renderToStaticMarkup(blockMappingSourceBlockODT(b)))
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
  xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
  xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
  office:version="1.3">
  <office:scripts/>
  <office:font-face-decls/>
  <office:automatic-styles/>
  <office:body>
    <office:text>
      ${paragraphsMarkup}
    </office:text>
  </office:body>
</office:document-content>`;
}

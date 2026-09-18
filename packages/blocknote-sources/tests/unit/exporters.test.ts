import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Document as PdfDocument, Page, renderToBuffer } from '@react-pdf/renderer';
import { Document, Packer } from 'docx';
import { strFromU8, unzipSync } from 'fflate';
import { expect, it } from 'vitest';
import { blockMappingSourceBlockDocx, blockMappingSourceBlockODT, blockMappingSourceBlockPDF } from '../../src/exporters';
import { SourceBlockExportBlock } from '../../src/types';

const block: SourceBlockExportBlock = {
  id: 'export-test', type: 'sourceBlock', content: [], children: [],
  props: {
    entityType: 'law', displayMode: 'callout', sourceId: 'external-id',
    title: 'Titre exporte', subtitle: 'Sous-titre', status: 'Demonstration',
    statusColor: 'gray', meta1: 'Identifiant', meta2: '', meta3: '',
    excerpt: 'Contenu de la citation', summary: '', url: 'https://example.org/source',
    verifiedAt: '', provider: 'test-provider', origin: 'demo', country: 'fr', retrievedAt: '',
    rawPayload: '', textAlignment: 'left', backgroundColor: 'default',
  },
};

it('generates a real DOCX with citation, border and external relationship', async () => {
  const document = new Document({ sections: [{ children: [blockMappingSourceBlockDocx(block)] }] });
  const entries = unzipSync(await Packer.toBuffer(document));
  const xml = strFromU8(entries['word/document.xml']);
  expect(xml).toContain('Titre exporte');
  expect(xml).toContain('Contenu de la citation');
  expect(xml).toContain('w:val="single"');
  expect(strFromU8(entries['word/_rels/document.xml.rels'])).toContain('https://example.org/source');
});

it('generates a real PDF containing the source link', async () => {
  const document = createElement(PdfDocument, {}, createElement(Page, {}, blockMappingSourceBlockPDF(block)));
  const bytes = await renderToBuffer(document);
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  expect(bytes.toString()).toContain('https://example.org/source');
  expect(bytes.byteLength).toBeGreaterThan(1000);
});

it('serializes ODF text and links, escaping untrusted markup', () => {
  const xml = renderToStaticMarkup(blockMappingSourceBlockODT({ ...block, props: { ...block.props, title: '<script>unsafe</script>' } }));
  expect(xml).toContain('&lt;script&gt;unsafe&lt;/script&gt;');
  expect(xml).toContain('Contenu de la citation');
  expect(xml).toContain('xlink:href="https://example.org/source"');
});

import { describe, expect, it, vi } from 'vitest';

vi.mock('@react-pdf/renderer', () => ({
  StyleSheet: {
    create: (styles: unknown) => styles,
  },
  Text: (props: unknown) => ({ type: 'Text', props }),
  View: (props: unknown) => ({ type: 'View', props }),
  Link: (props: unknown) => ({ type: 'Link', props }),
}));

vi.mock('docx', () => ({
  Paragraph: class MockParagraph {
    options: unknown;
    constructor(options: unknown) {
      this.options = options;
    }
  },
  TextRun: class MockTextRun {
    options: unknown;
    constructor(options: unknown) {
      this.options = options;
    }
  },
  ExternalHyperlink: class MockExternalHyperlink {
    options: unknown;
    constructor(options: unknown) {
      this.options = options;
    }
  },
}));

import {
    blockMappingSourceBlockDocx,
    blockMappingSourceBlockODT,
    blockMappingSourceBlockPDF,
} from '../../src/exporters';
import { SourceBlockExportBlock } from '../../src/types';

describe('SourceBlock Exporters Mapping', () => {
  const mockBlock: SourceBlockExportBlock = {
    id: 'block-01',
    type: 'sourceBlock',
    props: {
      entityType: 'law',
      displayMode: 'callout',
      sourceId: 'LEGIARTI000037812976',
      title: 'Article L. 111-1 du Code de la commande publique',
      subtitle: 'Code de la commande publique',
      status: 'En vigueur',
      statusColor: 'green',
      meta1: 'LEGIARTI000037812976',
      meta2: 'Ordonnance n° 2018-1074',
      meta3: 'Entrée en vigueur : 01/04/2019',
      excerpt: 'Un marché est un contrat conclu...',
      summary: 'Définit les marchés publics.',
      url: 'https://www.legifrance.gouv.fr',
      verifiedAt: '17/09/2026',
      rawPayload: '',
      textAlignment: 'left',
      backgroundColor: 'default',
    },
    content: [],
    children: [],
  };

  it('PDF exporter should generate a valid View structure', () => {
    const pdfElement = blockMappingSourceBlockPDF(mockBlock);
    expect(pdfElement).toBeDefined();
    expect(pdfElement.type).toBeDefined();
  });

  it('Docx exporter should generate a valid Paragraph structure', () => {
    const docxElement = blockMappingSourceBlockDocx(mockBlock);
    expect(docxElement).toBeDefined();
  });

  it('ODT exporter should generate a valid ODF XML element', () => {
    const odtElement = blockMappingSourceBlockODT(mockBlock);
    expect(odtElement).toBeDefined();
  });
});

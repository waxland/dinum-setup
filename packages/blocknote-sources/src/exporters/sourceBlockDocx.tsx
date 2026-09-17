import { ExternalHyperlink, Paragraph, TextRun } from 'docx';

import { SourceBlockExportBlock } from '../types';

export const blockMappingSourceBlockDocx = (
  block: SourceBlockExportBlock,
) => {
  const props = block.props;
  const metaParts = [props.meta1, props.meta2, props.meta3].filter(Boolean);

  const children: (TextRun | ExternalHyperlink)[] = [
    new TextRun({
      text: props.title || 'Source Souveraine',
      bold: true,
      color: '000091',
      size: 22,
    }),
  ];

  if (props.status) {
    children.push(
      new TextRun({
        text: `  [${props.status}]`,
        bold: true,
        color: '0E793C',
        size: 18,
      }),
    );
  }

  if (props.subtitle) {
    children.push(
      new TextRun({
        text: props.subtitle,
        break: 1,
        color: '666666',
        size: 18,
      }),
    );
  }

  if (metaParts.length > 0) {
    children.push(
      new TextRun({
        text: metaParts.join(' • '),
        break: 1,
        color: '555555',
        size: 16,
      }),
    );
  }

  if (props.excerpt) {
    children.push(
      new TextRun({
        text: `« ${props.excerpt} »`,
        break: 1,
        italics: true,
        color: '1E1E1E',
        size: 18,
      }),
    );
  } else if (props.summary) {
    children.push(
      new TextRun({
        text: props.summary,
        break: 1,
        color: '333333',
        size: 18,
      }),
    );
  }

  if (props.url) {
    children.push(
      new TextRun({
        text: '',
        break: 1,
      }),
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: 'Consulter la source officielle',
            style: 'Hyperlink',
            color: '000091',
            underline: {},
            size: 16,
          }),
        ],
        link: props.url,
      }),
    );
  }

  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      left: {
        color: '000091',
        space: 10,
        value: 'single',
        size: 24,
      },
    },
    shading: {
      fill: 'F8F8FB',
    },
    children,
  });
};

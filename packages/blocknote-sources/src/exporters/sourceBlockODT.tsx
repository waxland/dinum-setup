import React from 'react';

import { SourceBlockExportBlock } from '../types';

export interface GenericExporterODT {
  options: {
    styles: Record<string, unknown>;
    colors: Record<string, string>;
  };
  transformInlineContent: (content: unknown) => React.ReactNode[];
}

export const blockMappingSourceBlockODT = (
  block: SourceBlockExportBlock,
  _exporter?: GenericExporterODT,
) => {
  const props = block.props;
  const metaParts = [props.meta1, props.meta2, props.meta3].filter(Boolean);

  const contentElements: React.ReactNode[] = [
    React.createElement(
      'text:span',
      { key: 'title', 'text:style-name': 'Bold' },
      `[${props.entityType?.toUpperCase() || 'SOURCE'}] ${props.title || ''}`,
    ),
  ];

  if (props.status) {
    contentElements.push(
      React.createElement(
        'text:span',
        { key: 'status' },
        ` (${props.status})`,
      ),
    );
  }

  if (props.subtitle) {
    contentElements.push(
      React.createElement('text:line-break', { key: 'br-sub' }),
      React.createElement(
        'text:span',
        { key: 'sub' },
        props.subtitle,
      ),
    );
  }

  if (metaParts.length > 0) {
    contentElements.push(
      React.createElement('text:line-break', { key: 'br-meta' }),
      React.createElement(
        'text:span',
        { key: 'meta' },
        metaParts.join(' • '),
      ),
    );
  }

  if (props.excerpt) {
    contentElements.push(
      React.createElement('text:line-break', { key: 'br-exc' }),
      React.createElement(
        'text:span',
        { key: 'exc' },
        `« ${props.excerpt} »`,
      ),
    );
  } else if (props.summary) {
    contentElements.push(
      React.createElement('text:line-break', { key: 'br-sum' }),
      React.createElement(
        'text:span',
        { key: 'sum' },
        props.summary,
      ),
    );
  }

  if (props.url) {
    contentElements.push(
      React.createElement('text:line-break', { key: 'br-url' }),
      React.createElement('text:a', { key: 'url', 'xlink:href': props.url, 'xlink:type': 'simple' }, props.url),
    );
  }

  return React.createElement(
    'text:p',
    {
      'text:style-name': 'Standard',
    },
    ...contentElements,
  );
};

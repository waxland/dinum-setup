declare module '@react-pdf/renderer' {
  import React from 'react';
  export const StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => T;
  };
  export const Text: React.FC<{
    style?: unknown;
    children?: React.ReactNode;
  }>;
  export const View: React.FC<{
    style?: unknown;
    wrap?: boolean;
    children?: React.ReactNode;
  }>;
  export const Link: React.FC<{
    src: string;
    style?: unknown;
    children?: React.ReactNode;
  }>;
}

declare module 'docx' {
  export class TextRun {
    constructor(options: {
      text?: string;
      bold?: boolean;
      color?: string;
      size?: number;
      break?: number;
      italics?: boolean;
      style?: string;
      underline?: Record<string, unknown>;
    });
  }

  export class ExternalHyperlink {
    constructor(options: {
      children: TextRun[];
      link: string;
    });
  }

  export class Paragraph {
    constructor(options: {
      spacing?: { before?: number; after?: number };
      border?: Record<string, unknown>;
      shading?: Record<string, unknown>;
      children: (TextRun | ExternalHyperlink)[];
    });
  }
}

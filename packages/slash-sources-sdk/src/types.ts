/**
 * Types and interfaces for Sovereign Sources SDK.
 * Strict TypeScript definition - 0 any, 0 cast.
 */

export type SourceEntityType =
  | 'law'
  | 'company'
  | 'parliament'
  | 'address'
  | 'procurement'
  | 'grant'
  | 'insee'
  | 'agent'
  | 'cadastre'
  | 'demarche'
  | 'opendata'
  | 'custom';

export type DisplayMode = 'callout' | 'card' | 'link';

export type StatusColor =
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'gray';

export interface SourceEntityProps {
  entityType: SourceEntityType;
  displayMode: DisplayMode;
  sourceId: string;
  title: string;
  subtitle?: string;
  status?: string;
  statusColor?: StatusColor;
  meta1?: string;
  meta2?: string;
  meta3?: string;
  excerpt?: string;
  summary?: string;
  url?: string;
  verifiedAt?: string;
  rawPayload?: Record<string, unknown> | string;
}

export interface SourceSuggestResult {
  id: string;
  title: string;
  subtitle?: string;
  type: SourceEntityType;
}

export interface SourceProviderDefinition {
  type: SourceEntityType;
  name: string;
  iconName: string;
  slashCommand: string;
  slashAliases: string[];
  description: string;
  suggest: (query: string, limit?: number) => Promise<SourceSuggestResult[]>;
  search: (query: string, limit?: number) => Promise<SourceEntityProps[]>;
  getDetail: (sourceId: string) => Promise<SourceEntityProps | null>;
}

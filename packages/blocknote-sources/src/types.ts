import {
    BlockConfig,
    BlockNoDefaults,
    BlockNoteEditor,
    InlineContentSchema,
    StyleSchema,
    defaultProps,
} from '@blocknote/core';
import type {
    ExternalSourceDisplayMode,
    ExternalSourceEntity,
    ExternalSourceMetadataField,
    ExternalSourceProviderDefinition,
    ExternalSourceStatus,
    ExternalSourceSuggestResult,
    ProviderHealthInfo,
    ProviderHealthStatus,
} from '@suitenumerique/slash-sources-sdk';

export type {
    ExternalSourceDisplayMode,
    ExternalSourceEntity,
    ExternalSourceMetadataField,
    ExternalSourceProviderDefinition,
    ExternalSourceStatus,
    ExternalSourceSuggestResult,
    ProviderHealthInfo,
    ProviderHealthStatus
};

export type SourceEntityType =
  | 'law'
  | 'case-law'
  | 'company'
  | 'parliament'
  | 'address'
  | 'place'
  | 'procurement'
  | 'grant'
  | 'statistics'
  | 'insee'
  | 'agent'
  | 'cadastre'
  | 'demarche'
  | 'opendata'
  | 'research'
  | 'custom';

export type DisplayMode = ExternalSourceDisplayMode;


export type StatusColor =
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'gray';

export const SOURCE_ENTITY_TYPES = [
  'law',
  'case-law',
  'company',
  'parliament',
  'address',
  'place',
  'procurement',
  'grant',
  'statistics',
  'insee',
  'agent',
  'cadastre',
  'demarche',
  'opendata',
  'research',
  'custom',
] as const;

export const DISPLAY_MODES = [
  'callout',
  'card',
  'link',
] as const;

export const STATUS_COLORS = [
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'gray',
] as const;

export function isSourceEntityType(value: unknown): value is SourceEntityType {
  return typeof value === 'string' && SOURCE_ENTITY_TYPES.some((t) => t === value);
}

export function isDisplayMode(value: unknown): value is DisplayMode {
  return typeof value === 'string' && DISPLAY_MODES.some((m) => m === value);
}

export function isStatusColor(value: unknown): value is StatusColor {
  return typeof value === 'string' && STATUS_COLORS.some((c) => c === value);
}

export function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export type TranslationFn = (key: string, ...args: unknown[]) => string;

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
  freshness?: 'live' | 'cached' | 'offline_index';
  rawPayload?: string;
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

export type CreateSourceBlockConfig = BlockConfig<
  'sourceBlock',
  {
    entityType: { default: 'law'; values: typeof SOURCE_ENTITY_TYPES };
    displayMode: { default: 'callout'; values: typeof DISPLAY_MODES };
    sourceId: { default: '' };
    title: { default: '' };
    subtitle: { default: '' };
    status: { default: '' };
    statusColor: { default: 'blue'; values: typeof STATUS_COLORS };
    meta1: { default: '' };
    meta2: { default: '' };
    meta3: { default: '' };
    excerpt: { default: '' };
    summary: { default: '' };
    url: { default: '' };
    verifiedAt: { default: '' };
    rawPayload: { default: '' };
    textAlignment: typeof defaultProps.textAlignment;
    backgroundColor: typeof defaultProps.backgroundColor;
  },
  'none'
>;

export type SourceBlockExportBlock = BlockNoDefaults<
  Record<'sourceBlock', CreateSourceBlockConfig>,
  InlineContentSchema,
  StyleSchema
>;

export type SourceBlockSchema = {
  sourceBlock: CreateSourceBlockConfig;
};

export type SourceBlockEditor = BlockNoteEditor<
  SourceBlockSchema,
  InlineContentSchema,
  StyleSchema
>;

/**
 * Types and interfaces for the Universal Source Provider SDK.
 * Strict TypeScript definitions - Zero any, Zero unsafe casts.
 */

export type ExternalSourceDisplayMode = 'callout' | 'card' | 'link';

export type ExternalSourceStatus =
  | 'valid'       // e.g., En vigueur / In force / In Kraft / Geldend
  | 'repealed'    // e.g., Abrogé / Repealed / Außer Kraft / Vervallen
  | 'pending'     // e.g., En cours / Pending / In Beratung / In behandeling
  | 'archived'    // e.g., Archivé / Archived / Archiviert / Gearchiveerd
  | 'custom';

export type StatusColor =
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'gray';

export interface ExternalSourceMetadataField {
  key?: string;
  label: string;
  value: string | number | boolean;
  highlight?: boolean;
}

export interface ExternalSourceEntity {
  id?: string;
  provider?: string;               // e.g. "legifrance", "gesetze-im-internet", "overheid", "eurlex"
  title: string;
  subtitle?: string;
  contentHtml?: string;
  snippet?: string;
  excerpt?: string;
  summary?: string;
  url?: string;
  status?: ExternalSourceStatus | string;
  statusLabel?: string;          // Human-readable status in current locale
  statusColor?: StatusColor;
  statusBadgeColor?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  borderColor?: string;          // Institutional border color (e.g. #000091 for Marianne)
  displayMode: ExternalSourceDisplayMode;
  metadata?: Record<string, string | number | boolean>;
  metadataFields?: ExternalSourceMetadataField[];
  updatedAt?: string;
  verifiedAt?: string;
  rawPayload?: Record<string, unknown> | string;
  // Legacy compatibility fields
  entityType?: SourceEntityType;
  sourceId?: string;
  meta1?: string;
  meta2?: string;
  meta3?: string;
}

export interface ExternalSourceSuggestResult {
  id: string;
  provider?: string;
  title: string;
  subtitle?: string;
  type?: SourceEntityType;
  badge?: string;
  badgeColor?: string;
}

export interface ExternalSourceProviderDefinition {
  name: string;
  slashCommand: string;          // e.g. "law", "loi", "gesetz", "wet"
  icon?: string;                  // e.g. "⚖️", "🏢", "📍", "🧠"
  iconName?: string;
  group?: string;                // Group header in slash menu
  description?: string;
  placeholder?: string;
  type?: SourceEntityType;
  slashAliases?: string[];
  suggest: (query: string, limit?: number) => Promise<ExternalSourceSuggestResult[]>;
  search: (query: string, limit?: number) => Promise<ExternalSourceEntity[]>;
  getDetail: (id: string) => Promise<ExternalSourceEntity | null>;
}

// ============================================================================
// Legacy Backwards-Compatibility Type Aliases
// ============================================================================

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
  | 'custom'
  | string;

export type DisplayMode = ExternalSourceDisplayMode;

export type SourceEntityProps = ExternalSourceEntity;

export type SourceSuggestResult = ExternalSourceSuggestResult;

export type SourceProviderDefinition = ExternalSourceProviderDefinition;

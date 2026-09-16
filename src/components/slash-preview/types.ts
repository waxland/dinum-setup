export type SourceEntityType =
  | "law"
  | "company"
  | "parliament"
  | "address"
  | "custom";

export type DisplayMode = "callout" | "card" | "link";

export interface SourceEntityProps {
  sourceType: SourceEntityType;
  sourceId: string;
  provider: string;
  title: string;
  subtitle?: string;
  status: string;
  statusBadgeColor?: "info" | "success" | "warning" | "error";
  contentHtml?: string;
  summary?: string;
  metaField1Label?: string;
  metaField1Value?: string;
  metaField2Label?: string;
  metaField2Value?: string;
  metaField3Label?: string;
  metaField3Value?: string;
  displayMode: DisplayMode;
  url: string;
  lastSyncAt?: string;
}

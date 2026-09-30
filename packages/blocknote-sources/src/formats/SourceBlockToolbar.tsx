import React, { useEffect, useState } from "react";
import { getI18nStrings } from "../i18n";
import { useSourceSearchConfiguration } from "../SourceSearchContext";
import { DisplayMode } from "../types";

interface SourceBlockToolbarProps {
  currentMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
  url?: string;
  sourceTypeLabel: string;
}

export const SourceBlockToolbar: React.FC<SourceBlockToolbarProps> = ({
  currentMode,
  onModeChange,
  url,
  sourceTypeLabel,
}) => {
  const configuration = useSourceSearchConfiguration();
  const i18n = getI18nStrings(configuration.locale || "fr");
  const [announcement, setAnnouncement] = useState("");

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Look for Ctrl+Alt+[1,2,3]
      if (e.ctrlKey && e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          onModeChange("callout");
          setAnnouncement(`Mode d'affichage changé vers : ${i18n.modes.callout}`);
        } else if (e.key === "2") {
          e.preventDefault();
          onModeChange("card");
          setAnnouncement(`Mode d'affichage changé vers : ${i18n.modes.card}`);
        } else if (e.key === "3") {
          e.preventDefault();
          onModeChange("link");
          setAnnouncement(`Mode d'affichage changé vers : ${i18n.modes.link}`);
        }
      }
    };

    // We only attach to the document if the block is focused.
    // However, a simple global listener is easiest for this iteration.
    // In a real editor we'd scope this or use ProseMirror shortcuts.
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onModeChange, i18n]);

  // Clear announcement after screen reader picks it up
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  return (
    <div
      contentEditable={false}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "6px",
        padding: "2px 0",
        marginBottom: "4px",
        userSelect: "none",
        fontSize: "11px",
        color: "var(--text-muted, #777777)",
      }}
    >
      {/* Screen reader announcement region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {announcement}
      </div>

      <span
        style={{
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "10px",
          letterSpacing: "0.04em",
        }}
      >
        {sourceTypeLabel}
      </span>

      <div
        role="group"
        aria-label={i18n.displayModeLabel}
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        {(["callout", "card", "link"] as const).map((mode, index) => {
          const label =
            mode === "callout"
              ? i18n.modes.callout
              : mode === "card"
                ? i18n.modes.card
                : i18n.modes.link;
          const isActive = currentMode === mode;
          const shortcut = `Ctrl+Alt+${index + 1}`;

          return (
            <button
              key={mode}
              type="button"
              aria-pressed={isActive}
              title={`${label} (${shortcut})`}
              aria-keyshortcuts={shortcut}
              onClick={(e) => {
                e.preventDefault();
                onModeChange(mode);
              }}
              style={{
                padding: "1px 5px",
                fontSize: "10px",
                fontFamily: "inherit",
                fontWeight: isActive ? 600 : 400,
                border: "1px solid var(--border-color, #e5e5e5)",
                background: isActive ? "var(--bg-surface, #e5e5e5)" : "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "1px 4px",
              fontSize: "11px",
              color: "inherit",
              textDecoration: "none",
              marginLeft: "2px",
            }}
            title={i18n.openSource}
            aria-label={i18n.openSource}
          >
            ↗
          </a>
        )}
      </div>
    </div>
  );
};

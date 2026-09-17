import {
  BlockConfig,
  BlockNoDefaults,
  BlockNoteEditor,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import React, { useEffect, useRef, useState } from "react";
import { searchMockSources } from "./mockData";
import { DisplayMode, SourceEntityProps, SourceEntityType } from "./types";

export type PlaygroundSourceBlockConfig = BlockConfig<
  "sourceBlock",
  {
    sourceType: { default: "law" };
    sourceId: { default: "" };
    provider: { default: "" };
    title: { default: "" };
    subtitle: { default: "" };
    status: { default: "VIGUEUR" };
    statusBadgeColor: { default: "success" };
    contentHtml: { default: "" };
    summary: { default: "" };
    metaField1Label: { default: "" };
    metaField1Value: { default: "" };
    metaField2Label: { default: "" };
    metaField2Value: { default: "" };
    metaField3Label: { default: "" };
    metaField3Value: { default: "" };
    displayMode: { default: "callout" };
    url: { default: "" };
    lastSyncAt: { default: "" };
  },
  "none"
>;

interface SourceBlockComponentProps {
  block: BlockNoDefaults<
    Record<"sourceBlock", PlaygroundSourceBlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
  editor: BlockNoteEditor<
    Record<"sourceBlock", PlaygroundSourceBlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
}

const CATEGORY_TABS: { type: SourceEntityType; label: string; icon: string }[] = [
  { type: "law", label: "Loi", icon: "⚖️" },
  { type: "company", label: "Entreprise", icon: "🏢" },
  { type: "parliament", label: "Assemblée", icon: "🏛️" },
  { type: "address", label: "Adresse", icon: "📍" },
  { type: "procurement", label: "Marché", icon: "🛍️" },
  { type: "grant", label: "Subvention", icon: "💶" },
  { type: "insee", label: "Stats", icon: "📊" },
  { type: "agent", label: "Annuaire", icon: "👤" },
  { type: "cadastre", label: "Cadastre", icon: "🗺️" },
  { type: "demarche", label: "Démarche", icon: "📝" },
  { type: "opendata", label: "OpenData", icon: "🌐" },
  { type: "custom", label: "Albert IA", icon: "🧠" },
];

const SourceBlockComponent: React.FC<SourceBlockComponentProps> = ({
  block,
  editor,
}) => {
  const isSelected = Boolean(block.props.sourceId && block.props.title);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SourceEntityType>(
    block.props.sourceType || "law"
  );
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchMockSources(searchQuery, selectedType);

  useEffect(() => {
    if (!isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  const handleSelectSource = (item: SourceEntityProps) => {
    editor.updateBlock(block, {
      type: "sourceBlock",
      props: {
        sourceType: item.sourceType,
        sourceId: item.sourceId,
        provider: item.provider,
        title: item.title,
        subtitle: item.subtitle || "",
        status: item.status || "VIGUEUR",
        statusBadgeColor: item.statusBadgeColor || "success",
        contentHtml: item.contentHtml || "",
        summary: item.summary || "",
        metaField1Label: item.metaField1Label || "",
        metaField1Value: item.metaField1Value || "",
        metaField2Label: item.metaField2Label || "",
        metaField2Value: item.metaField2Value || "",
        metaField3Label: item.metaField3Label || "",
        metaField3Value: item.metaField3Value || "",
        displayMode: block.props.displayMode || item.displayMode || "callout",
        url: item.url || "",
        lastSyncAt: new Date().toLocaleDateString("fr-FR"),
      },
    });
  };

  const handleSwitchMode = (mode: DisplayMode) => {
    editor.updateBlock(block, {
      props: {
        displayMode: mode,
      },
    });
  };

  const handleReset = () => {
    editor.updateBlock(block, {
      props: {
        sourceId: "",
        title: "",
      },
    });
  };

  const handleDelete = () => {
    editor.removeBlocks([block]);
  };

  const getProviderIcon = (type: SourceEntityType) => {
    switch (type) {
      case "law":
        return "⚖️";
      case "company":
        return "🏢";
      case "parliament":
        return "🏛️";
      case "address":
        return "📍";
      case "procurement":
        return "🛍️";
      case "grant":
        return "💶";
      case "insee":
        return "📊";
      case "agent":
        return "👤";
      case "cadastre":
        return "🗺️";
      case "demarche":
        return "📝";
      case "opendata":
        return "🌐";
      case "custom":
        return "🧠";
      default:
        return "📄";
    }
  };

  // 1. SEARCH STATE (When no source is selected yet)
  if (!isSelected) {
    return (
      <div
        contentEditable={false}
        style={{
          margin: "12px 0",
          padding: "14px",
          borderRadius: "8px",
          border: "2px solid #000091",
          background: "var(--background-alt-grey, #f6f6f6)",
          boxShadow: "0 6px 18px rgba(0, 0, 145, 0.1)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            paddingBottom: "8px",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#000091",
            }}
          >
            <span>{getProviderIcon(selectedType)}</span>
            <span>Recherche Souveraine ({selectedType.toUpperCase()})</span>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "#e8edff",
              padding: "2px",
              borderRadius: "6px",
              overflowX: "auto",
              maxWidth: "70%",
            }}
          >
            {CATEGORY_TABS.map((cat) => {
              const isActive = selectedType === cat.type;
              return (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setSelectedType(cat.type)}
                  style={{
                    padding: "3px 8px",
                    fontSize: "11px",
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: "4px",
                    border: "none",
                    background: isActive ? "#000091" : "transparent",
                    color: isActive ? "#ffffff" : "#000091",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input box */}
        <div style={{ marginTop: "10px", position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) => (prev + 1) % Math.max(1, results.length));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev <= 0 ? results.length - 1 : prev - 1
                );
              } else if (e.key === "Enter" && results[highlightIndex]) {
                e.preventDefault();
                handleSelectSource(results[highlightIndex]);
              } else if (e.key === "Escape") {
                e.preventDefault();
                handleDelete();
              }
            }}
            placeholder={`Rechercher dans ${
              CATEGORY_TABS.find((c) => c.type === selectedType)?.label || "la source"
            }... (ex: commande publique, DINUM, Paris)`}
            style={{
              width: "100%",
              fontSize: "13px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#ffffff",
              color: "#1e1e1e",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Search Results List */}
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxHeight: "220px",
            overflowY: "auto",
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: "16px",
                textAlign: "center",
                fontSize: "12px",
                color: "#666666",
                fontStyle: "italic",
              }}
            >
              Aucun résultat pour « {searchQuery} ». Essayez un autre mot-clé.
            </div>
          ) : (
            results.map((item, idx) => {
              const isItemHighlighted = highlightIndex === idx;
              return (
                <button
                  key={item.sourceId}
                  type="button"
                  onClick={() => handleSelectSource(item)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    cursor: "pointer",
                    border: isItemHighlighted ? "1px solid #000091" : "1px solid #eeeeee",
                    background: isItemHighlighted ? "#e8edff" : "#ffffff",
                    color: isItemHighlighted ? "#000091" : "#1e1e1e",
                    transition: "all 0.1s ease",
                  }}
                >
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{getProviderIcon(item.sourceType)}</span>
                      <span>{item.title}</span>
                      {item.subtitle && (
                        <span style={{ fontSize: "11px", fontWeight: 400, color: "#666666" }}>
                          — {item.subtitle}
                        </span>
                      )}
                    </div>
                    {item.summary && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#666666",
                          marginTop: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.summary}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: "#000091",
                      color: "#ffffff",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    Insérer ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div
          style={{
            marginTop: "8px",
            paddingTop: "6px",
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#666666",
          }}
        >
          <span>Navigation : ↑ ↓ Flèches • ↵ Entrée pour valider</span>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              background: "transparent",
              border: "none",
              color: "#c9191e",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "11px",
            }}
          >
            Annuler (Échap)
          </button>
        </div>
      </div>
    );
  }

  // 2. RENDERED STATE (When source is selected and active)
  const mode = block.props.displayMode || "callout";

  return (
    <div
      contentEditable={false}
      style={{
        margin: "12px 0",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Floating Action Bar to Switch Modes */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
          padding: "4px 8px",
          background: "#f5f5fe",
          border: "1px solid #e5e5e5",
          borderRadius: "4px",
          marginBottom: "6px",
          fontSize: "11px",
        }}
      >
        <span style={{ fontWeight: 700, color: "#000091", textTransform: "uppercase" }}>
          {block.props.provider || "Source Souveraine"}
        </span>

        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => handleSwitchMode("callout")}
            style={{
              padding: "2px 8px",
              borderRadius: "3px",
              border: mode === "callout" ? "1px solid #000091" : "1px solid #ccc",
              background: mode === "callout" ? "#000091" : "#ffffff",
              color: mode === "callout" ? "#ffffff" : "#1e1e1e",
              cursor: "pointer",
              fontWeight: mode === "callout" ? 700 : 500,
              fontSize: "11px",
            }}
            title="Format Encadré / Callout"
          >
            📢 Encadré
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode("card")}
            style={{
              padding: "2px 8px",
              borderRadius: "3px",
              border: mode === "card" ? "1px solid #000091" : "1px solid #ccc",
              background: mode === "card" ? "#000091" : "#ffffff",
              color: mode === "card" ? "#ffffff" : "#1e1e1e",
              cursor: "pointer",
              fontWeight: mode === "card" ? 700 : 500,
              fontSize: "11px",
            }}
            title="Format Carte (3 colonnes)"
          >
            🗂️ Carte
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode("link")}
            style={{
              padding: "2px 8px",
              borderRadius: "3px",
              border: mode === "link" ? "1px solid #000091" : "1px solid #ccc",
              background: mode === "link" ? "#000091" : "#ffffff",
              color: mode === "link" ? "#ffffff" : "#1e1e1e",
              cursor: "pointer",
              fontWeight: mode === "link" ? 700 : 500,
              fontSize: "11px",
            }}
            title="Format Pastille / Lien"
          >
            🔗 Lien
          </button>
          <div style={{ width: "1px", height: "12px", background: "#cccccc", margin: "0 2px" }} />
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "2px 6px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "11px",
            }}
            title="Modifier la recherche"
          >
            🔍 Modifier
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: "2px 6px",
              borderRadius: "3px",
              border: "1px solid #f5a3a3",
              background: "#fbe8e8",
              color: "#c9191e",
              cursor: "pointer",
              fontSize: "11px",
            }}
            title="Supprimer ce bloc"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* A. FORMAT CALLOUT */}
      {mode === "callout" && (
        <div
          style={{
            padding: "16px",
            borderRadius: "4px",
            borderLeft: "4px solid #000091",
            borderTop: "1px solid #e5e5e5",
            borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            background: "#f8f8fb",
            boxShadow: "0 1px 3px rgba(0, 0, 145, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>{getProviderIcon(block.props.sourceType)}</span>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#000091" }}>
                {block.props.title} {block.props.subtitle ? `— ${block.props.subtitle}` : ""}
              </h4>
            </div>
            {block.props.status && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: "#e8f7ee",
                  color: "#0e793c",
                  border: "1px solid #9de2b8",
                }}
              >
                {block.props.status}
              </span>
            )}
          </div>

          {block.props.contentHtml && (
            <div
              style={{
                fontSize: "13px",
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "#1e1e1e",
                background: "#ffffff",
                padding: "8px 12px",
                borderRadius: "3px",
                border: "1px solid #e5e5e5",
                margin: "8px 0",
              }}
              dangerouslySetInnerHTML={{ __html: block.props.contentHtml }}
            />
          )}

          {block.props.summary && !block.props.contentHtml && (
            <p style={{ fontSize: "13px", color: "#444444", margin: "6px 0", lineHeight: 1.4 }}>
              {block.props.summary}
            </p>
          )}

          <div
            style={{
              marginTop: "8px",
              paddingTop: "6px",
              borderTop: "1px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#666666",
            }}
          >
            <span>
              {block.props.metaField1Label ? `${block.props.metaField1Label} : ${block.props.metaField1Value} ` : ""}
              {block.props.metaField2Label ? `• ${block.props.metaField2Label} : ${block.props.metaField2Value}` : ""}
            </span>
            {block.props.url && (
              <a
                href={block.props.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000091", fontWeight: 600, textDecoration: "none" }}
              >
                Consulter sur la source officielle ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* B. FORMAT CARTE */}
      {mode === "card" && (
        <div
          style={{
            padding: "16px",
            borderRadius: "4px",
            border: "1px solid #e5e5e5",
            background: "#ffffff",
            boxShadow: "0 1px 4px rgba(0, 0, 145, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>{getProviderIcon(block.props.sourceType)}</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e1e1e" }}>
                  {block.props.title}
                </div>
                {block.props.subtitle && (
                  <div style={{ fontSize: "11px", color: "#666666" }}>
                    {block.props.subtitle}
                  </div>
                )}
              </div>
            </div>
            {block.props.status && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: "#e8f7ee",
                  color: "#0e793c",
                  border: "1px solid #9de2b8",
                }}
              >
                {block.props.status}
              </span>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              padding: "8px",
              borderRadius: "4px",
              background: "#f8f8fb",
              fontSize: "11px",
              margin: "8px 0",
            }}
          >
            <div>
              <div style={{ color: "#666666", fontWeight: 600 }}>
                {block.props.metaField1Label || "Réf"}
              </div>
              <div style={{ fontWeight: 700, color: "#1e1e1e" }}>
                {block.props.metaField1Value || "—"}
              </div>
            </div>
            <div>
              <div style={{ color: "#666666", fontWeight: 600 }}>
                {block.props.metaField2Label || "Info"}
              </div>
              <div style={{ fontWeight: 700, color: "#1e1e1e" }}>
                {block.props.metaField2Value || "—"}
              </div>
            </div>
            <div>
              <div style={{ color: "#666666", fontWeight: 600 }}>
                {block.props.metaField3Label || "Validité"}
              </div>
              <div style={{ fontWeight: 700, color: "#1e1e1e" }}>
                {block.props.metaField3Value || "—"}
              </div>
            </div>
          </div>

          {block.props.summary && (
            <p style={{ fontSize: "12px", color: "#444444", margin: "6px 0 8px 0", lineHeight: 1.4 }}>
              {block.props.summary}
            </p>
          )}

          {block.props.url && (
            <div style={{ textAlign: "right", marginTop: "4px" }}>
              <a
                href={block.props.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000091", fontWeight: 600, fontSize: "11px", textDecoration: "none" }}
              >
                Ouvrir la fiche officielle ↗
              </a>
            </div>
          )}
        </div>
      )}

      {/* C. FORMAT LIEN */}
      {mode === "link" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            borderRadius: "4px",
            background: "#e8edff",
            border: "1px solid #000091",
            color: "#000091",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          <span>{getProviderIcon(block.props.sourceType)}</span>
          <a
            href={block.props.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#000091", textDecoration: "none" }}
          >
            {block.props.title}
          </a>
          {block.props.status && (
            <span style={{ fontSize: "10px", opacity: 0.85 }}>({block.props.status})</span>
          )}
        </span>
      )}
    </div>
  );
};

export const SourceBlock = () =>
  createReactBlockSpec(
    {
      type: "sourceBlock",
      propSchema: {
        sourceType: { default: "law" },
        sourceId: { default: "" },
        provider: { default: "" },
        title: { default: "" },
        subtitle: { default: "" },
        status: { default: "VIGUEUR" },
        statusBadgeColor: { default: "success" },
        contentHtml: { default: "" },
        summary: { default: "" },
        metaField1Label: { default: "" },
        metaField1Value: { default: "" },
        metaField2Label: { default: "" },
        metaField2Value: { default: "" },
        metaField3Label: { default: "" },
        metaField3Value: { default: "" },
        displayMode: { default: "callout" },
        url: { default: "" },
        lastSyncAt: { default: "" },
      },
      content: "none",
    },
    {
      render: ({ block, editor }) => (
        <SourceBlockComponent block={block} editor={editor} />
      ),
    }
  );

export const createSourceBlockSpec = SourceBlock;
export const SourceBlockSpec = SourceBlock;


import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
    SuggestionMenuController,
    getDefaultReactSlashMenuItems,
    useCreateBlockNote,
} from "@blocknote/react";
import React, { useEffect, useMemo, useState } from "react";

import { SourceBlock } from "./SourceBlockSpec";
import { MOCK_SOURCES } from "./mockData";
import { SourceEntityType } from "./types";

export const BlockNoteSlashPlayground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document === "undefined") return;
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          margin: "24px 0",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          background: "var(--background-alt-grey, #f6f6f6)",
          textAlign: "center",
          fontFamily: "var(--font-family-base, sans-serif)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "12px", color: "#666666" }}>
          <span>Initializing interactive BlockNote.js editor...</span>
        </div>
      </div>
    );
  }

  return <BlockNoteSlashEditorInner isDark={isDark} />;
};

const createEmptySourceBlock = (sourceType: SourceEntityType) => ({
  type: "sourceBlock" as const,
  props: {
    sourceType,
    sourceId: "",
    provider: "",
    title: "",
    subtitle: "",
    status: "VIGUEUR",
    statusBadgeColor: "success" as const,
    contentHtml: "",
    summary: "",
    metaField1Label: "",
    metaField1Value: "",
    metaField2Label: "",
    metaField2Value: "",
    metaField3Label: "",
    metaField3Value: "",
    displayMode: "callout" as const,
    url: "",
    lastSyncAt: "",
  },
});

const BlockNoteSlashEditorInner: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const playgroundSchema = useMemo(() => {
    return BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        sourceBlock: SourceBlock(),
      },
    });
  }, []);

  // Initialize editor
  const editor = useCreateBlockNote({
    schema: playgroundSchema,
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Welcome to the interactive editor of ",
            styles: {},
          },
          {
            type: "text",
            text: "La Suite Docs",
            styles: { bold: true },
          },
          {
            type: "text",
            text: " ! Type ",
            styles: {},
          },
          {
            type: "text",
            text: "/",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: " to explore sovereign commands or use quick buttons above:",
            styles: {},
          },
        ],
      },
      {
        type: "sourceBlock",
        props: {
          ...MOCK_SOURCES.law[0],
          displayMode: "callout",
        },
      },
      {
        type: "sourceBlock",
        props: {
          ...MOCK_SOURCES.company[0],
          displayMode: "card",
        },
      },
      {
        type: "sourceBlock",
        props: {
          ...MOCK_SOURCES.address[0],
          displayMode: "link",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hover over each block to hot-switch between 📢 Callout, 🗂️ Card, and 🔗 Link formats.",
            styles: { italic: true },
          },
        ],
      },
    ],
  });

  // Custom Slash Menu Items
  const customSlashMenuItems = useMemo(() => {
    if (!editor) return [];

    const customItems = [
      {
        title: "Legal Text (Légifrance)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("law")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["loi", "law", "legifrance", "code", "article", "decret"],
        group: "Sovereign & Official Sources",
        icon: <span>⚖️</span>,
        subtext: "Insert a certified legal article from Légifrance",
      },
      {
        title: "Company Record & SIREN",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("company")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["entreprise", "pappers", "siren", "siret", "societe", "kbis"],
        group: "Sovereign & Official Sources",
        icon: <span>🏢</span>,
        subtext: "Insert certified business registry data (SIREN, managers)",
      },
      {
        title: "Parliamentary Amendment",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("parliament")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["assemblee", "assemble", "an", "amendement", "depute"],
        group: "Sovereign & Official Sources",
        icon: <span>🏛️</span>,
        subtext: "Track a parliamentary amendment or legislative bill",
      },
      {
        title: "Postal Address (BAN)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("address")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["adresse", "address", "ban", "geo", "rue"],
        group: "Sovereign & Official Sources",
        icon: <span>📍</span>,
        subtext: "Certified autocomplete from National Address Base",
      },
      {
        title: "Public Procurement Notice (BOAMP)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("procurement")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["marche", "boamp", "achat", "dce", "dae"],
        group: "Sovereign & Official Sources",
        icon: <span>🛍️</span>,
        subtext: "Insert an official public procurement notice (BOAMP)",
      },
      {
        title: "Public Grant & Subsidy",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("grant")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["subvention", "aides", "fonds-vert", "detr", "dsil", "anct"],
        group: "Sovereign & Official Sources",
        icon: <span>💶</span>,
        subtext: "Insert a territorial funding or grant program",
      },
      {
        title: "Territorial Statistics INSEE",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("insee")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["insee", "stats", "population", "territoire"],
        group: "Sovereign & Official Sources",
        icon: <span>📊</span>,
        subtext: "Insert official INSEE demographic indicators",
      },
      {
        title: "Public Service Directory",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("agent")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["agent", "annuaire", "service-public", "contact"],
        group: "Sovereign & Official Sources",
        icon: <span>👤</span>,
        subtext: "Insert official contact details of a public administration",
      },
      {
        title: "Land Registry & Parcels (DGFiP)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("cadastre")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["cadastre", "parcelle", "foncier", "dgfip"],
        group: "Sovereign & Official Sources",
        icon: <span>🗺️</span>,
        subtext: "Insert a certified DGFiP land registry parcel",
      },
      {
        title: "Simplified Procedures",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("demarche")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["demarche", "formulaire", "usager", "procedure"],
        group: "Sovereign & Official Sources",
        icon: <span>📝</span>,
        subtext: "Insert a simplified online administrative procedure",
      },
      {
        title: "data.gouv.fr / Open Data",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("opendata")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["opendata", "dataset", "datagouv", "donnees"],
        group: "Sovereign & Official Sources",
        icon: <span>🌐</span>,
        subtext: "Insert a certified open dataset from data.gouv.fr",
      },
      {
        title: "Albert Sovereign AI & RAG",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("custom")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["albert", "ia", "rag", "etalab", "service-public"],
        group: "Sovereign & Official Sources",
        icon: <span>🧠</span>,
        subtext: "Ask an administrative query to Albert Sovereign AI",
      },
    ];

    return [...customItems, ...getDefaultReactSlashMenuItems(editor)];
  }, [editor]);

  // Insert helper from toolbar buttons
  const handleInsert = (type: SourceEntityType) => {
    if (!editor) return;
    const currentBlock =
      editor.getTextCursorPosition()?.block ||
      editor.document[editor.document.length - 1];
    editor.insertBlocks([createEmptySourceBlock(type)], currentBlock, "after");
  };

  const handleReset = () => {
    if (!editor) return;
    editor.replaceBlocks(editor.document, [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Editor reset. Type / to insert a sovereign command.",
            styles: {},
          },
        ],
      },
    ]);
  };

  const FAST_BUTTONS: { type: SourceEntityType; label: string; icon: string }[] = [
    { type: "law", label: "/loi", icon: "⚖️" },
    { type: "company", label: "/entreprise", icon: "🏢" },
    { type: "parliament", label: "/assemblee", icon: "🏛️" },
    { type: "address", label: "/adresse", icon: "📍" },
    { type: "procurement", label: "/marche", icon: "🛍️" },
    { type: "grant", label: "/subvention", icon: "💶" },
    { type: "insee", label: "/stats", icon: "📊" },
    { type: "agent", label: "/agent", icon: "👤" },
    { type: "cadastre", label: "/cadastre", icon: "🗺️" },
    { type: "demarche", label: "/demarche", icon: "📝" },
    { type: "opendata", label: "/opendata", icon: "🌐" },
    { type: "custom", label: "/albert", icon: "🧠" },
  ];

  return (
    <div
      style={{
        margin: "24px 0",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #e5e5e5",
        background: isDark ? "#0f172a" : "#ffffff",
        boxShadow: "0 4px 16px rgba(0, 0, 145, 0.06)",
        overflow: "hidden",
        fontFamily: "var(--font-family-base, sans-serif)",
      }}
    >
      {/* Playground Header Bar */}
      <div
        style={{
          padding: "12px 16px",
          background: isDark ? "#1e293b" : "#f8f8fb",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: isDark ? "#8585f6" : "#000091" }}>
            Interactive BlockNote.js Demonstrator
          </span>
          <span
            style={{
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "10px",
              background: isDark ? "#172554" : "#e8edff",
              color: isDark ? "#93c5fd" : "#000091",
              fontWeight: 700,
              border: "1px solid #b8c5ff",
            }}
          >
            Common Core
          </span>
        </div>

        {/* Quick Insert Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", color: "#666666", marginRight: "4px" }}>
            Quick insert:
          </span>
          {FAST_BUTTONS.map((btn) => (
            <button
              key={btn.type}
              type="button"
              onClick={() => handleInsert(btn.type)}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #e5e5e5",
                background: isDark ? "#334155" : "#ffffff",
                color: isDark ? "#f8fafc" : "#1e1e1e",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
          <div style={{ width: "1px", height: "16px", background: "#cccccc", margin: "0 4px" }} />
          <button
            type="button"
            onClick={handleReset}
            style={{
              fontSize: "11px",
              color: "#c9191e",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "3px 6px",
            }}
            title="Reset editor"
          >
            🗑️ Reset
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div
        style={{
          padding: "16px 24px",
          minHeight: "380px",
          background: isDark ? "#0f172a" : "#ffffff",
          color: isDark ? "#f8fafc" : "#1e1e1e",
        }}
      >
        <BlockNoteView
          editor={editor}
          theme={isDark ? "dark" : "light"}
          slashMenu={false}
        >
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              customSlashMenuItems.filter(
                (item) =>
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.aliases?.some((a) =>
                    a.toLowerCase().includes(query.toLowerCase())
                  )
              )
            }
          />
        </BlockNoteView>
      </div>

      {/* Playground Footer Info */}
      <div
        style={{
          padding: "8px 16px",
          background: isDark ? "#1e293b" : "#f8f8fb",
          borderTop: "1px solid #e5e5e5",
          fontSize: "11px",
          color: "#666666",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>💡 Astuce : Tapez <strong>/</strong> n'importe où dans le texte pour ouvrir le menu d'autocomplétion.</span>
        <span>Moteur BlockNote 0.54 • Design System de l'État (DSFR)</span>
      </div>
    </div>
  );
};

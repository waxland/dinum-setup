import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
    SuggestionMenuController,
    getDefaultReactSlashMenuItems,
    useCreateBlockNote,
} from "@blocknote/react";
import React, { useEffect, useMemo, useState } from "react";

import { createSourceBlockSpec } from "./SourceBlockSpec";
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
      <div className="my-6 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 text-center font-sans">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span className="h-3 w-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <span>Initialisation de l'éditeur interactif BlockNote.js...</span>
        </div>
      </div>
    );
  }

  return <BlockNoteSlashEditorInner isDark={isDark} />;
};

const BlockNoteSlashEditorInner: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const playgroundSchema = useMemo(() => {
    return BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        sourceBlock: createSourceBlockSpec(),
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
            text: "Bienvenue dans l'éditeur interactif de ",
            styles: {},
          },
          {
            type: "text",
            text: "La Suite Docs",
            styles: { bold: true },
          },
          {
            type: "text",
            text: " ! Tapez ",
            styles: {},
          },
          {
            type: "text",
            text: "/",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: " pour tester les commandes souveraines ou utilisez les boutons rapides ci-dessus :",
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
            text: "Essayez de survoler chaque bloc pour basculer en direct entre les formats 📢 Callout, 🗂️ Carte et 🔗 Lien.",
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
        title: "Texte de Loi (Légifrance)",
        onItemClick: () => {
          editor.insertBlocks(
            [
              {
                type: "sourceBlock",
                props: {
                  sourceType: "law",
                  sourceId: "",
                  title: "",
                },
              },
            ],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["loi", "law", "legifrance", "code", "article", "decret"],
        group: "Sources Souveraines de l'État",
        icon: <span>⚖️</span>,
        subtext: "Insérer un article de loi certifié depuis Légifrance",
      },
      {
        title: "Fiche Entreprise & SIREN",
        onItemClick: () => {
          editor.insertBlocks(
            [
              {
                type: "sourceBlock",
                props: {
                  sourceType: "company",
                  sourceId: "",
                  title: "",
                },
              },
            ],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["entreprise", "pappers", "siren", "siret", "societe", "kbis"],
        group: "Sources Souveraines de l'État",
        icon: <span>🏢</span>,
        subtext: "Insérer les données certifiées du RNE (SIREN, dirigeants)",
      },
      {
        title: "Amendement Parlementaire",
        onItemClick: () => {
          editor.insertBlocks(
            [
              {
                type: "sourceBlock",
                props: {
                  sourceType: "parliament",
                  sourceId: "",
                  title: "",
                },
              },
            ],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["assemblee", "assemble", "an", "amendement", "depute"],
        group: "Sources Souveraines de l'État",
        icon: <span>🏛️</span>,
        subtext: "Suivre un amendement ou projet de loi en séance",
      },
      {
        title: "Adresse Postale (BAN)",
        onItemClick: () => {
          editor.insertBlocks(
            [
              {
                type: "sourceBlock",
                props: {
                  sourceType: "address",
                  sourceId: "",
                  title: "",
                },
              },
            ],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["adresse", "address", "ban", "geo", "rue"],
        group: "Sources Souveraines de l'État",
        icon: <span>📍</span>,
        subtext: "Autocomplétion certifiée par la Base Adresse Nationale",
      },
    ];

    return [...customItems, ...getDefaultReactSlashMenuItems(editor)];
  }, [editor]);

  // Insert helper from toolbar buttons
  const handleInsert = (type: SourceEntityType) => {
    if (!editor) return;
    editor.insertBlocks(
      [
        {
          type: "sourceBlock",
          props: {
            sourceType: type,
            sourceId: "",
            title: "",
          },
        },
      ],
      editor.getTextCursorPosition()?.block || editor.document[editor.document.length - 1],
      "after"
    );
  };

  const handleReset = () => {
    if (!editor) return;
    editor.replaceBlocks(editor.document, [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Éditeur réinitialisé. Tapez / pour ajouter une commande souveraine.",
            styles: {},
          },
        ],
      },
    ]);
  };

  return (
    <div className="not-prose my-6 w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-md overflow-hidden font-sans">
      {/* Playground Header Bar */}
      <div className="p-3.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            Démonstrateur Interactif BlockNote.js
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
            Socle Commun
          </span>
        </div>

        {/* Quick Insert Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-gray-400 dark:text-gray-500 mr-1">
            Insertion rapide :
          </span>
          <button
            type="button"
            onClick={() => handleInsert("law")}
            className="cursor-pointer text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xs transition-all"
          >
            ⚖️ /loi
          </button>
          <button
            type="button"
            onClick={() => handleInsert("company")}
            className="cursor-pointer text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xs transition-all"
          >
            🏢 /entreprise
          </button>
          <button
            type="button"
            onClick={() => handleInsert("parliament")}
            className="cursor-pointer text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xs transition-all"
          >
            🏛️ /assemblee
          </button>
          <button
            type="button"
            onClick={() => handleInsert("address")}
            className="cursor-pointer text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xs transition-all"
          >
            📍 /adresse
          </button>
          <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700 mx-1" />
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer text-xs text-gray-400 hover:text-red-500 px-1.5 py-1 rounded transition-colors"
            title="Réinitialiser l'éditeur"
          >
            🗑️ Vider
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="p-4 sm:p-6 min-h-[380px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
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
      <div className="px-4 py-2 bg-gray-50/80 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <span>💡 Astuce : Tapez <strong>/</strong> n'importe où dans le texte pour ouvrir le menu d'autocomplétion.</span>
        <span>Moteur BlockNote 0.54 • Design System de l'État (DSFR)</span>
      </div>
    </div>
  );
};

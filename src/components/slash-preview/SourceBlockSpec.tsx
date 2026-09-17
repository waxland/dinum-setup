import { createReactBlockSpec } from "@blocknote/react";
import React, { useEffect, useRef, useState } from "react";
import { searchMockSources } from "./mockData";
import { DisplayMode, SourceEntityProps, SourceEntityType } from "./types";

export const SourceBlock = createReactBlockSpec(
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
    render: (props: any) => {
      return <SourceBlockComponent {...props} />;
    },
  }
);

export const createSourceBlockSpec = () => SourceBlock();
export const SourceBlockSpec = SourceBlock;

interface SourceBlockComponentProps {
  block: any;
  editor: any;
}

const SourceBlockComponent: React.FC<SourceBlockComponentProps> = ({
  block,
  editor,
}) => {
  const p = block.props as SourceEntityProps;
  const isSelected = Boolean(p.sourceId && p.title);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SourceEntityType>(
    (p.sourceType as SourceEntityType) || "law"
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
        ...item,
        displayMode: p.displayMode || item.displayMode || "callout",
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

  const getProviderIcon = (type: string) => {
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
      case "custom":
        return "🧠";
      default:
        return "📄";
    }
  };

  // 1. SEARCH STATE (When no source is selected yet)
  if (!isSelected) {
    return (
      <div className="my-3 p-3.5 rounded-xl border-2 border-blue-500/80 bg-white dark:bg-gray-900 shadow-lg text-gray-900 dark:text-gray-100 font-sans not-prose">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400">
            <span>{getProviderIcon(selectedType)}</span>
            <span>Recherche Souveraine ({selectedType.toUpperCase()})</span>
          </div>
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-[11px] overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedType("law")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "law"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              ⚖️ Loi
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("company")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "company"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🏢 Entreprise
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("parliament")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "parliament"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🏛️ Assemblée
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("address")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "address"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              📍 Adresse
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("procurement")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "procurement"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🛍️ Marché
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("grant")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "grant"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              💶 Subvention
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("insee")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "insee"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              📊 Stats
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("agent")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "agent"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              👤 Agent
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("cadastre")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "cadastre"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🗺️ Cadastre
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("demarche")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "demarche"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              📝 Démarche
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("opendata")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "opendata"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🌐 OpenData
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("custom")}
              className={`cursor-pointer px-2 py-0.5 rounded-md font-medium transition-all ${
                selectedType === "custom"
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              🧠 Albert IA
            </button>
          </div>
        </div>

        {/* Input box */}
        <div className="mt-2.5 relative">
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
            placeholder={`Rechercher ${
              selectedType === "law"
                ? "un article, code, décret (ex: commande publique, CGCT)..."
                : selectedType === "company"
                ? "une entreprise ou un SIREN (ex: DINUM, Scaleway, 849201928)..."
                : selectedType === "parliament"
                ? "un amendement ou dossier (ex: 142, souveraineté)..."
                : "une adresse certifiée BAN (ex: 20 avenue de ségur)..."
            }`}
            className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Search Results List */}
        <div className="mt-2 flex flex-col gap-1 max-h-56 overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-4 text-center text-xs text-gray-400 italic">
              Aucun résultat pour "{searchQuery}". Essayez un autre mot-clé.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.sourceId}
                type="button"
                onClick={() => handleSelectSource(item)}
                onMouseEnter={() => setHighlightIndex(idx)}
                className={`cursor-pointer w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-2 ${
                  highlightIndex === idx
                    ? "bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                }`}
              >
                <div className="flex flex-col truncate">
                  <div className="font-bold flex items-center gap-1.5 truncate">
                    <span>{getProviderIcon(item.sourceType)}</span>
                    <span>{item.title}</span>
                    {item.subtitle && (
                      <span className="text-[11px] font-normal text-gray-500 dark:text-gray-400 truncate">
                        — {item.subtitle}
                      </span>
                    )}
                  </div>
                  {item.summary && (
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {item.summary}
                    </span>
                  )}
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-semibold shrink-0">
                  Insérer ↵
                </span>
              </button>
            ))
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
          <span>Navigation : ↑ ↓ Flèches • ↵ Entrée pour valider</span>
          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer text-red-500 hover:underline"
          >
            Annuler (Échap)
          </button>
        </div>
      </div>
    );
  }

  // 2. RENDERED STATE (When source is selected and active)
  return (
    <div className="source-block-container not-prose my-3 relative group font-sans">
      {/* Hover Floating Action Bar to Switch Modes */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1 p-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xs border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10 text-[11px]">
        <button
          type="button"
          onClick={() => handleSwitchMode("callout")}
          className={`cursor-pointer px-2 py-0.5 rounded font-medium transition-colors ${
            p.displayMode === "callout"
              ? "bg-blue-600 text-white font-bold"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          title="Format Callout (Encadré officiel)"
        >
          📢 Callout
        </button>
        <button
          type="button"
          onClick={() => handleSwitchMode("card")}
          className={`cursor-pointer px-2 py-0.5 rounded font-medium transition-colors ${
            p.displayMode === "card"
              ? "bg-blue-600 text-white font-bold"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          title="Format Carte (Synthèse multi-colonnes)"
        >
          🗂️ Carte
        </button>
        <button
          type="button"
          onClick={() => handleSwitchMode("link")}
          className={`cursor-pointer px-2 py-0.5 rounded font-medium transition-colors ${
            p.displayMode === "link"
              ? "bg-blue-600 text-white font-bold"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          title="Format Lien (Badge compact inline)"
        >
          🔗 Lien
        </button>
        <div className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700 mx-0.5" />
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer px-1.5 py-0.5 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Modifier la recherche"
        >
          🔄
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer px-1.5 py-0.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
          title="Supprimer ce bloc"
        >
          🗑️
        </button>
      </div>

      {/* A. FORMAT CALLOUT */}
      {p.displayMode === "callout" && (
        <div className="p-4 rounded-xl border-l-4 border-l-[#000091] border-y border-r border-gray-200 dark:border-gray-800 bg-[#F5F5FE] dark:bg-[#0F172A] shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getProviderIcon(p.sourceType)}</span>
              <h4 className="text-sm font-bold text-[#000091] dark:text-[#8585f6] m-0">
                {p.title} {p.subtitle ? `— ${p.subtitle}` : ""}
              </h4>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {p.status}
            </span>
          </div>

          {p.contentHtml && (
            <div
              className="text-xs text-gray-800 dark:text-gray-200 italic my-2.5 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p.contentHtml }}
            />
          )}

          {p.summary && !p.contentHtml && (
            <p className="text-xs text-gray-700 dark:text-gray-300 italic my-2">
              {p.summary}
            </p>
          )}

          <div className="mt-3 pt-2 border-t border-blue-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>Certifié via {p.provider}</span>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Consulter la source officielle ↗
            </a>
          </div>
        </div>
      )}

      {/* B. FORMAT CARTE */}
      {p.displayMode === "card" && (
        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getProviderIcon(p.sourceType)}</span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 m-0">
                {p.title}
              </h4>
              {p.subtitle && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium truncate max-w-[200px]">
                  {p.subtitle}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {p.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-400 text-[10px] block">
                {p.metaField1Label || "Identifiant"}
              </span>
              <strong className="text-gray-800 dark:text-gray-200 truncate block">
                {p.metaField1Value || p.sourceId}
              </strong>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">
                {p.metaField2Label || "Type"}
              </span>
              <strong className="text-gray-800 dark:text-gray-200 truncate block">
                {p.metaField2Value || "Officiel"}
              </strong>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">
                {p.metaField3Label || "Référence"}
              </span>
              <strong className="text-gray-800 dark:text-gray-200 truncate block">
                {p.metaField3Value || p.provider}
              </strong>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span className="truncate max-w-[65%]">{p.summary || p.subtitle}</span>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Ouvrir ↗
            </a>
          </div>
        </div>
      )}

      {/* C. FORMAT LIEN INLINE */}
      {p.displayMode === "link" && (
        <div className="inline-block my-1">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors shadow-2xs"
          >
            <span>{getProviderIcon(p.sourceType)}</span>
            <span>{p.title}</span>
            {p.subtitle && (
              <span className="text-[11px] font-normal text-blue-600/80 dark:text-blue-400/80">
                ({p.subtitle})
              </span>
            )}
            <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold">
              {p.status}
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

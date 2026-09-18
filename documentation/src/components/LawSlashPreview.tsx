import { useState } from "react";

export interface LawArticleData {
  id: string;
  articleNumber: string;
  codeTitle: string;
  status: string;
  source: string;
  url: string;
  paragraphs: string[];
}

const sampleArticle: LawArticleData = {
  id: "LEGIARTI000032041571",
  articleNumber: "Article 1240",
  codeTitle: "Code civil",
  status: "En vigueur",
  source: "Légifrance",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032041571",
  paragraphs: [
    "Tout fait quelconque de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer.",
  ],
};

const sampleResults = [
  {
    type: "article",
    title: "Article 1240",
    subtitle: "Code civil · En vigueur",
    code: "Code civil",
  },
  {
    type: "article",
    title: "Article 1241",
    subtitle: "Code civil · En vigueur",
    code: "Code civil",
  },
  {
    type: "code_browse",
    title: "Code civil — Parcourir les articles",
    subtitle: "2 534 articles · Version consolidée",
    code: "Code civil",
  },
];

const codeCivilArticles = [
  {
    type: "article",
    title: "Article 1100",
    subtitle: "Des contrats ou des obligations conventionnelles",
    code: "Code civil",
  },
  {
    type: "article",
    title: "Article 1240",
    subtitle: "De la responsabilité extracontractuelle",
    code: "Code civil",
  },
  {
    type: "article",
    title: "Article 1241",
    subtitle: "De la responsabilité du fait d'autrui",
    code: "Code civil",
  },
];

/**
 * Interactive preview of the 4 Law Slash Command states:
 * 1. Menu de recherche contextuel (/loi)
 * 2. Mode Extrait (bloc complet)
 * 3. Mode Référence (ligne compacte)
 * 4. Mode Lien (dans le paragraphe avec barre contextuelle)
 */
export function LawSlashPreview() {
  const [activeTab, setActiveTab] = useState<"search" | "extrait" | "reference" | "lien">("search");
  
  // Search Menu states
  const [searchFilter, setSearchFilter] = useState<"all" | "codes" | "lois">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBrowsingCode, setIsBrowsingCode] = useState(false);

  // Mode selector popup state
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  // Three dots menu state
  const [isDotsMenuOpen, setIsDotsMenuOpen] = useState(false);
  // Contextual bar on link mode
  const [isLinkBarOpen, setIsLinkBarOpen] = useState(true);

  // Active display mode for the block/inline
  const [_displayMode, setDisplayMode] = useState<"extrait" | "reference" | "lien">("extrait");

  const currentResults = isBrowsingCode
    ? codeCivilArticles
    : searchFilter === "lois"
    ? [
        {
          type: "article",
          title: "Article 1 - Loi n° 2016-1321 (République numérique)",
          subtitle: "Loi du 7 octobre 2016 · En vigueur",
          code: "Loi République numérique",
        },
        {
          type: "article",
          title: "Article 5 - Loi n° 2022-217 (3DS)",
          subtitle: "Loi du 21 février 2022 · En vigueur",
          code: "Loi 3DS",
        },
        {
          type: "article",
          title: "Article 1 - Loi Informatique et Libertés",
          subtitle: "Loi n° 78-17 du 6 janvier 1978 · En vigueur",
          code: "Loi Informatique et Libertés",
        },
      ]
    : searchFilter === "codes"
    ? [
        {
          type: "article",
          title: "Article 1240",
          subtitle: "Code civil · En vigueur",
          code: "Code civil",
        },
        {
          type: "code_browse",
          title: "Code de la commande publique — Parcourir",
          subtitle: "1 820 articles · En vigueur",
          code: "Code de la commande publique",
        },
        {
          type: "code_browse",
          title: "Code de la consommation — Parcourir",
          subtitle: "1 150 articles · En vigueur",
          code: "Code de la consommation",
        },
      ]
    : sampleResults;

  return (
    <div className="not-prose my-6 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-6 shadow-xs">
      {/* Tab bar to switch between the 4 main states */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#000091]">
            Démonstrateur Interactif
          </span>
          <h3 className="text-base font-bold text-gray-900 m-0">
            Interface de la Commande <code className="text-sm font-mono text-[#000091] bg-blue-50 px-1.5 py-0.5 rounded">/loi</code>
          </h3>
        </div>

        <div className="flex flex-wrap gap-1 bg-white p-1 rounded-lg border border-gray-200 text-xs shadow-2xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab("search");
              setIsModeMenuOpen(false);
              setIsDotsMenuOpen(false);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "search"
                ? "bg-[#000091] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            1. Menu Recherche (/loi)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("extrait");
              setDisplayMode("extrait");
              setIsModeMenuOpen(false);
              setIsDotsMenuOpen(false);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "extrait"
                ? "bg-[#000091] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            2. Mode Extrait
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("reference");
              setDisplayMode("reference");
              setIsModeMenuOpen(false);
              setIsDotsMenuOpen(false);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "reference"
                ? "bg-[#000091] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            3. Mode Référence
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("lien");
              setDisplayMode("lien");
              setIsLinkBarOpen(true);
              setIsModeMenuOpen(false);
              setIsDotsMenuOpen(false);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "lien"
                ? "bg-[#000091] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            4. Mode Lien + Barre
          </button>
        </div>
      </div>

      {/* Editor simulation container */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 min-h-[360px] relative font-sans text-gray-800">
        
        {/* State 1: Floating Search Contextual Menu */}
        {activeTab === "search" && (
          <div className="space-y-4">
            <div className="text-sm text-gray-500 font-serif leading-relaxed">
              Pour engager la responsabilité civile de l'auteur d'une faute involontaire, nous nous fondons sur la règle générale :
            </div>
            
            <div className="inline-flex items-center text-sm font-mono text-[#000091] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">
              /loi<span className="inline-block w-1.5 h-4 bg-[#000091] ml-0.5 animate-pulse" />
            </div>

            {/* Contextual Floating Menu (340-380px) */}
            <div className="w-full max-w-[360px] rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden text-sm z-20 transition-all">
              {/* Menu Title */}
              <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  {isBrowsingCode ? "Code civil — Articles" : "Rechercher une référence"}
                </span>
                {isBrowsingCode && (
                  <button
                    type="button"
                    onClick={() => setIsBrowsingCode(false)}
                    className="text-xs text-[#000091] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ← Retour
                  </button>
                )}
              </div>

              {/* Search input with magnifier icon */}
              <div className="p-2 border-b border-gray-100">
                <div className="relative flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-2.5 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Sujet, article ou nom d'un texte..."
                    className="w-full pl-8 pr-2 py-1.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-[#000091] focus:outline-none"
                  />
                </div>
              </div>

              {/* Discrete Filters: Tout | Codes | Lois */}
              {!isBrowsingCode && (
                <div className="px-3 py-1.5 border-b border-gray-100 flex items-center gap-4 text-xs bg-gray-50/50">
                  <button
                    type="button"
                    onClick={() => setSearchFilter("all")}
                    className={`pb-0.5 cursor-pointer ${
                      searchFilter === "all"
                        ? "text-[#000091] font-semibold border-b-2 border-[#000091]"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Tout
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchFilter("codes")}
                    className={`pb-0.5 cursor-pointer ${
                      searchFilter === "codes"
                        ? "text-[#000091] font-semibold border-b-2 border-[#000091]"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Codes
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchFilter("lois")}
                    className={`pb-0.5 cursor-pointer ${
                      searchFilter === "lois"
                        ? "text-[#000091] font-semibold border-b-2 border-[#000091]"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Lois
                  </button>
                </div>
              )}

              {/* Results List (Height limited, 3 compact items visible) */}
              <div className="max-h-[190px] overflow-y-auto divide-y divide-gray-50">
                {currentResults.map((res, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (res.type === "code_browse") {
                        setIsBrowsingCode(true);
                      } else {
                        setActiveTab("extrait");
                        setDisplayMode("extrait");
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                      selectedIndex === idx ? "bg-gray-100/80" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 pr-2">
                      <svg
                        className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-900 truncate">
                          {res.title}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate mt-0.5">
                          {res.subtitle}
                        </div>
                      </div>
                    </div>

                    {res.type === "code_browse" ? (
                      <span className="text-gray-400 text-xs shrink-0">›</span>
                    ) : selectedIndex === idx ? (
                      <span className="text-[11px] font-mono text-[#000091] bg-blue-50 px-1 py-0.5 rounded shrink-0">
                        ↵
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Footer with keyboard navigation tips */}
              <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
                <span>↑ ↓ Naviguer · ↵ Insérer · Échap Fermer</span>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Mode « Extrait » (Full Block) */}
        {activeTab === "extrait" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed m-0">
              Dans le cadre de l'évaluation des risques et du régime de réparation civile, nous intégrons directement le texte de loi applicable :
            </p>

            {/* Extrait Block */}
            <div className="border border-gray-200 bg-white rounded-lg overflow-hidden my-4">
              {/* Compact Header Toolbar */}
              <div className="bg-gray-50/80 px-3 py-1.5 border-b border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <svg className="w-3.5 h-3.5 text-[#000091]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span>Référence juridique</span>
                </div>

                <div className="flex items-center gap-2 relative">
                  {/* Mode Selector Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsModeMenuOpen(!isModeMenuOpen);
                      setIsDotsMenuOpen(false);
                    }}
                    className="text-xs text-gray-700 hover:text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1 cursor-pointer"
                  >
                    Extrait <span className="text-[10px] text-gray-400">▾</span>
                  </button>

                  {/* Options Menu Button (...) */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDotsMenuOpen(!isDotsMenuOpen);
                      setIsModeMenuOpen(false);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-800 p-0.5 rounded hover:bg-gray-100 cursor-pointer"
                    aria-label="Options de la référence"
                  >
                    …
                  </button>

                  {/* Mode Selector Popup (~210px) */}
                  {isModeMenuOpen && (
                    <div className="absolute right-0 top-6 w-[210px] rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-30 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setDisplayMode("extrait");
                          setActiveTab("extrait");
                          setIsModeMenuOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between bg-gray-100/80 font-medium text-gray-900"
                      >
                        <div>
                          <div>Extrait</div>
                          <div className="text-[10px] text-gray-500 font-normal">Texte et source</div>
                        </div>
                        <span className="text-[#000091]">✓</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDisplayMode("reference");
                          setActiveTab("reference");
                          setIsModeMenuOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700 mt-0.5"
                      >
                        <div>
                          <div>Référence</div>
                          <div className="text-[10px] text-gray-500">Titre uniquement</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDisplayMode("lien");
                          setActiveTab("lien");
                          setIsModeMenuOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700 mt-0.5"
                      >
                        <div>
                          <div>Lien</div>
                          <div className="text-[10px] text-gray-500">Lien dans le texte</div>
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Three Dots Menu Popup */}
                  {isDotsMenuOpen && (
                    <div className="absolute right-0 top-6 w-[180px] rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-30 text-xs">
                      <a
                        href={sampleArticle.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-2 py-1.5 rounded hover:bg-gray-50 text-gray-700"
                      >
                        Ouvrir la source
                      </a>
                      <button
                        type="button"
                        onClick={() => alert("Lien copié dans le presse-papier !")}
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-gray-700 cursor-pointer"
                      >
                        Copier le lien
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("search")}
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                      >
                        Supprimer la référence
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Block Body */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 m-0">
                    {sampleArticle.articleNumber} · {sampleArticle.codeTitle}
                  </h4>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {sampleArticle.status} · Source : {sampleArticle.source}
                  </div>
                </div>

                <div className="text-sm text-gray-800 leading-relaxed italic border-l-2 border-[#000091]/30 pl-3 py-0.5">
                  « {sampleArticle.paragraphs[0]} »
                </div>

                <div className="pt-1">
                  <a
                    href={sampleArticle.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#000091] hover:underline"
                  >
                    Consulter la source
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed m-0">
              Ce principe fondamental impose la réparation intégrale de tout préjudice direct et certain.
            </p>
          </div>
        )}

        {/* State 3: Mode « Référence » (Compact Single Line 48-56px) */}
        {activeTab === "reference" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed m-0">
              Pour consulter les obligations contractuelles et délictuelles :
            </p>

            {/* Reference Line */}
            <div className="h-[50px] border border-gray-200 bg-white rounded-lg px-3.5 flex items-center justify-between my-4">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <a
                  href={sampleArticle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#000091] hover:underline flex items-center gap-1 truncate"
                >
                  <span>{sampleArticle.articleNumber} · {sampleArticle.codeTitle}</span>
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-2 relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsModeMenuOpen(!isModeMenuOpen);
                    setIsDotsMenuOpen(false);
                  }}
                  className="text-xs text-gray-700 hover:text-gray-900 bg-gray-50 px-2 py-1 rounded border border-gray-200 flex items-center gap-1 cursor-pointer"
                >
                  Référence <span className="text-[10px] text-gray-400">▾</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDotsMenuOpen(!isDotsMenuOpen);
                    setIsModeMenuOpen(false);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-100 cursor-pointer"
                >
                  …
                </button>

                {/* Mode Selector Popup */}
                {isModeMenuOpen && (
                  <div className="absolute right-0 top-8 w-[210px] rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-30 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setDisplayMode("extrait");
                        setActiveTab("extrait");
                        setIsModeMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700"
                    >
                      <div>
                        <div>Extrait</div>
                        <div className="text-[10px] text-gray-500">Texte et source</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDisplayMode("reference");
                        setActiveTab("reference");
                        setIsModeMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between bg-gray-100/80 font-medium text-gray-900 mt-0.5"
                    >
                      <div>
                        <div>Référence</div>
                        <div className="text-[10px] text-gray-500 font-normal">Titre uniquement</div>
                      </div>
                      <span className="text-[#000091]">✓</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDisplayMode("lien");
                        setActiveTab("lien");
                        setIsModeMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700 mt-0.5"
                    >
                      <div>
                        <div>Lien</div>
                        <div className="text-[10px] text-gray-500">Lien dans le texte</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed m-0">
              L'article cité ci-dessus constitue le fondement de la responsabilité délictuelle.
            </p>
          </div>
        )}

        {/* State 4: Mode « Lien » (Inline + Floating contextual bar 36-40px x ~300px) */}
        {activeTab === "lien" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-800 leading-relaxed m-0 font-serif">
              Dans notre cas d'espèce, voir{" "}
              <span className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsLinkBarOpen(!isLinkBarOpen)}
                  className="text-[#000091] underline font-sans font-medium hover:text-blue-900 cursor-pointer bg-blue-50/50 px-1 py-0.5 rounded"
                >
                  Article 1240 du Code civil
                </button>

                {/* Contextual Floating Bar (36-40px x ~300px) */}
                {isLinkBarOpen && (
                  <div className="absolute left-0 top-7 w-[290px] h-[38px] rounded-lg border border-gray-200 bg-white shadow-md px-2 flex items-center justify-between text-xs z-30 animate-in fade-in zoom-in-95">
                    <a
                      href={sampleArticle.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#000091] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Légifrance</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <div className="h-4 w-[1px] bg-gray-200" />

                    <div className="flex items-center gap-1.5 relative">
                      <button
                        type="button"
                        onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
                        className="text-gray-700 hover:text-gray-900 px-1.5 py-0.5 rounded hover:bg-gray-100 flex items-center gap-0.5 cursor-pointer"
                      >
                        Lien <span className="text-[9px] text-gray-400">▾</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsDotsMenuOpen(!isDotsMenuOpen)}
                        className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        …
                      </button>

                      {/* Mode Selector Popup */}
                      {isModeMenuOpen && (
                        <div className="absolute right-0 top-7 w-[210px] rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-30 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setDisplayMode("extrait");
                              setActiveTab("extrait");
                              setIsModeMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700"
                          >
                            <div>
                              <div>Extrait</div>
                              <div className="text-[10px] text-gray-500">Texte et source</div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDisplayMode("reference");
                              setActiveTab("reference");
                              setIsModeMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-gray-50 text-gray-700 mt-0.5"
                          >
                            <div>
                              <div>Référence</div>
                              <div className="text-[10px] text-gray-500">Titre uniquement</div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDisplayMode("lien");
                              setActiveTab("lien");
                              setIsModeMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded flex items-center justify-between bg-gray-100/80 font-medium text-gray-900 mt-0.5"
                          >
                            <div>
                              <div>Lien</div>
                              <div className="text-[10px] text-gray-500 font-normal">Lien dans le texte</div>
                            </div>
                            <span className="text-[#000091]">✓</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </span>{" "}
              pour le fondement juridique de l'indemnisation réclamée par le requérant.
            </p>

            <div className="text-xs text-gray-400 italic pt-6 border-t border-gray-100">
              Astuce : Cliquez sur le lien souligné ci-dessus pour afficher ou masquer la barre d'outils contextuelle.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type MermaidProps = {
  chart?: string;
  children?: string;
  title?: string;
  caption?: string;
};

export const Mermaid: React.FC<MermaidProps> = ({
  chart,
  children,
  title,
  caption,
}) => {
  const content = (chart || children || "").trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      if (typeof window === "undefined" || !content) return;

      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.classList.contains("dark");

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: isDark ? "dark" : "default",
          themeVariables: isDark
            ? {
                primaryColor: "#000091",
                primaryTextColor: "#F8FAFC",
                primaryBorderColor: "#8585f6",
                lineColor: "#94A3B8",
                secondaryColor: "#1E293B",
                tertiaryColor: "#0F172A",
                background: "#0F172A",
                mainBkg: "#1E293B",
                nodeBorder: "#8585f6",
                clusterBkg: "#1E293B",
                clusterBorder: "#475569",
                defaultLinkColor: "#8585f6",
                fontFamily: "Marianne, system-ui, sans-serif",
                fontSize: "14px",
              }
            : {
                primaryColor: "#f5f5fe",
                primaryTextColor: "#000091",
                primaryBorderColor: "#000091",
                lineColor: "#475569",
                secondaryColor: "#FEF3C7",
                tertiaryColor: "#F0FDF4",
                background: "#FFFFFF",
                mainBkg: "#FFFFFF",
                nodeBorder: "#000091",
                clusterBkg: "#F8FAFC",
                clusterBorder: "#CBD5E1",
                defaultLinkColor: "#000091",
                fontFamily: "Marianne, system-ui, sans-serif",
                fontSize: "14px",
              },
        });

        // Generate unique container ID
        const uniqueId = `${id}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, content);

        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.warn("Mermaid render error:", err);
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    }

    renderChart();

    // Re-render when theme changes (Light / Dark)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          renderChart();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [content, id]);

  // Fullscreen keyboard & body scroll management
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setZoom(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  const handleOpenFullscreen = useCallback(() => {
    setIsFullscreen(true);
    setZoom(1);
  }, []);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoom(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 0.5));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  return (
    <>
      <div className="not-prose my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {/* Header with Title and Fullscreen Trigger */}
        <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-850 flex items-center justify-between gap-3">
          <div className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2 truncate">
            <span>📊</span>
            <span>{title || "Schéma d'Architecture"}</span>
          </div>
          {svg && (
            <button
              type="button"
              onClick={handleOpenFullscreen}
              title="Agrandir en plein écran (Échap pour quitter)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 hover:text-[#000091] dark:hover:text-[#8585f6] transition-colors shadow-2xs cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span>Plein écran</span>
            </button>
          )}
        </div>

        {/* Normal In-Page Diagram */}
        <div
          ref={containerRef}
          className="p-6 overflow-x-auto flex justify-center items-center min-h-[120px]"
        >
          {error ? (
            <div className="text-red-600 text-sm font-medium">
              ⚠️ Impossible d'afficher le schéma : {error}
            </div>
          ) : svg ? (
            <div
              className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto cursor-zoom-in"
              onClick={handleOpenFullscreen}
              title="Cliquer pour agrandir en plein écran"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="text-gray-400 text-sm italic">
              Chargement du schéma...
            </div>
          )}
        </div>

        {caption && (
          <div className="px-5 py-2.5 text-xs text-gray-500 dark:text-gray-400 italic text-center border-t border-gray-100 dark:border-gray-800">
            {caption}
          </div>
        )}
      </div>

      {/* Fullscreen Modal Overlay (rendered via Portal on document.body) */}
      {isFullscreen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-gray-950/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📊</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {title || "Schéma d'Architecture"}
                  </h3>
                  {caption && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Zoom & Close Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    title="Zoom arrière (-)"
                    className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    title="Réinitialiser le zoom"
                    className="px-2 py-1 text-xs font-mono font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    title="Zoom avant (+)"
                    className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCloseFullscreen}
                  title="Fermer le mode plein écran (Échap)"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
                >
                  <span>Fermer</span>
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
                    Échap
                  </kbd>
                </button>
              </div>
            </div>

            {/* Scrollable / Zoomable Center Area */}
            <div
              className="flex-1 w-full h-full overflow-auto flex items-center justify-center p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleCloseFullscreen();
                }
              }}
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                }}
                className="w-full h-full min-w-[300px] min-h-[300px] flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-[82vh] [&>svg]:w-auto [&>svg]:h-auto [&>svg]:overflow-visible drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Mermaid;

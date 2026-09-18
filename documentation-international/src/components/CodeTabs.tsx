import React, { useState } from "react";

export interface CodeTabItem {
  label: string;
  code: string;
  language?: string;
  icon?: string;
}

export interface CodeTabsProps {
  items: CodeTabItem[];
  defaultTab?: string;
  title?: string;
}

export function CodeTabs({ items, defaultTab, title }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<number>(() => {
    if (defaultTab) {
      const idx = items.findIndex(
        (it) => it.label.toLowerCase() === defaultTab.toLowerCase()
      );
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [copied, setCopied] = useState<boolean>(false);

  const currentItem = items[activeTab] || items[0];

  const handleCopy = async () => {
    if (!currentItem) {
      return;
    }
    try {
      await navigator.clipboard.writeText(currentItem.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % items.length;
      setActiveTab(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      setActiveTab(prev);
    }
  };

  return (
    <div className="my-5 bg-[#0d1117] text-gray-100 font-mono text-xs">
      {/* Header bar with tabs & copy button */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#161b22] px-3 py-1.5 select-none">
        <div
          role="tablist"
          aria-label={title || "Extraits de code"}
          className="flex items-center gap-1 overflow-x-auto"
        >
          {title && (
            <span className="text-xs font-semibold text-gray-400 mr-2 font-sans">
              {title}
            </span>
          )}
          {items.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.label}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans font-medium transition-colors ${
                  isActive
                    ? "bg-[#0d1117] text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
                {item.language && (
                  <span className="text-[10px] px-1 py-0.2 bg-gray-800 text-gray-400 uppercase">
                    {item.language}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Copié dans le presse-papier" : "Copier le code"}
          className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors font-sans cursor-pointer"
        >
          {copied ? (
            <>
              <span className="text-green-400">✓</span>
              <span className="text-green-400 font-medium">Copié !</span>
            </>
          ) : (
            <>
              <span className="text-gray-400">📋</span>
              <span>Copier</span>
            </>
          )}
        </button>
      </div>

      {/* Code panel */}
      <div
        role="tabpanel"
        tabIndex={0}
        className="p-3.5 overflow-x-auto text-[12px] leading-relaxed"
      >
        <pre className="m-0 p-0 bg-transparent text-gray-100 font-mono whitespace-pre">
          <code>{currentItem?.code}</code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Convenience component for JavaScript / TypeScript package installation commands.
 * Automatically generates tabs for npm, pnpm, yarn, and bun.
 */
export interface PackageInstallTabsProps {
  packages: string;
  dev?: boolean;
  global?: boolean;
}

export function PackageInstallTabs({
  packages,
  dev = false,
  global = false,
}: PackageInstallTabsProps) {
  const flags = {
    npm: global ? "-g" : dev ? "-D" : "",
    pnpm: global ? "-g" : dev ? "-D" : "",
    yarn: global ? "global" : dev ? "-D" : "",
    bun: global ? "-g" : dev ? "-d" : "",
  };

  const items: CodeTabItem[] = [
    {
      label: "npm",
      icon: "📦",
      language: "bash",
      code: `npm install ${flags.npm} ${packages}`.replace(/\s+/g, " ").trim(),
    },
    {
      label: "pnpm",
      icon: "⚡",
      language: "bash",
      code: `pnpm add ${flags.pnpm} ${packages}`.replace(/\s+/g, " ").trim(),
    },
    {
      label: "yarn",
      icon: "🧶",
      language: "bash",
      code: `yarn ${global ? "global add" : "add"} ${flags.yarn} ${packages}`
        .replace(/\s+/g, " ")
        .trim(),
    },
    {
      label: "bun",
      icon: "🍞",
      language: "bash",
      code: `bun add ${flags.bun} ${packages}`.replace(/\s+/g, " ").trim(),
    },
  ];

  return <CodeTabs items={items} title="Gestionnaire de paquets" />;
}

/**
 * Convenience component for Python package installation commands.
 * Automatically generates tabs for uv, poetry, pip, and pipenv.
 */
export interface PythonInstallTabsProps {
  packages: string;
  dev?: boolean;
}

export function PythonInstallTabs({
  packages,
  dev = false,
}: PythonInstallTabsProps) {
  const items: CodeTabItem[] = [
    {
      label: "uv",
      icon: "🚀",
      language: "bash",
      code: `uv add ${dev ? "--dev " : ""}${packages}`,
    },
    {
      label: "pip",
      icon: "🐍",
      language: "bash",
      code: `pip install ${packages}`,
    },
    {
      label: "poetry",
      icon: "📜",
      language: "bash",
      code: `poetry add ${dev ? "--group dev " : ""}${packages}`,
    },
    {
      label: "pipenv",
      icon: "🔒",
      language: "bash",
      code: `pipenv install ${dev ? "--dev " : ""}${packages}`,
    },
  ];

  return <CodeTabs items={items} title="Environnement Python" />;
}

/**
 * Convenience component for comparing TypeScript and Python (Django) code implementations.
 */
export interface DualLanguageTabsProps {
  tsCode: string;
  pyCode: string;
  tsTitle?: string;
  pyTitle?: string;
}

export function DualLanguageTabs({
  tsCode,
  pyCode,
  tsTitle = "TypeScript / React",
  pyTitle = "Python / Django",
}: DualLanguageTabsProps) {
  const items: CodeTabItem[] = [
    {
      label: tsTitle,
      icon: "⚛️",
      language: "typescript",
      code: tsCode.trim(),
    },
    {
      label: pyTitle,
      icon: "🐍",
      language: "python",
      code: pyCode.trim(),
    },
  ];

  return <CodeTabs items={items} title="Comparatif d'implémentation" />;
}

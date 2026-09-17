import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';

import { MOCK_SOURCES } from '../mockSources';
import { SourceEntityProps, SourceEntityType } from '../types';

interface SourceSearchPopoverProps {
  initialType?: SourceEntityType;
  onSelect: (entity: SourceEntityProps) => void;
  onCancel: () => void;
}

const CATEGORIES: { type: SourceEntityType; label: string; icon: string }[] = [
  { type: 'law', label: 'Loi', icon: '⚖️' },
  { type: 'company', label: 'Entreprise', icon: '🏢' },
  { type: 'parliament', label: 'Assemblée', icon: '🏛️' },
  { type: 'address', label: 'Adresse', icon: '📍' },
  { type: 'procurement', label: 'Marché', icon: '🛍️' },
  { type: 'grant', label: 'Subvention', icon: '💶' },
  { type: 'insee', label: 'Stats', icon: '📊' },
  { type: 'agent', label: 'Annuaire', icon: '👤' },
  { type: 'cadastre', label: 'Cadastre', icon: '🗺️' },
  { type: 'demarche', label: 'Démarche', icon: '📝' },
  { type: 'opendata', label: 'Open Data', icon: '🌐' },
  { type: 'custom', label: 'Albert IA', icon: '🧠' },
];

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({
  initialType = 'law',
  onSelect,
  onCancel,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SourceEntityType>(initialType);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const items = (MOCK_SOURCES[selectedCategory] || []).filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      (item.meta1 && item.meta1.toLowerCase().includes(q)) ||
      (item.meta2 && item.meta2.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (items.length > 0 ? (prev + 1) % items.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (items.length > 0 ? (prev - 1 + items.length) % items.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items.length > 0 && items[selectedIndex]) {
        onSelect(items[selectedIndex]);
      }
    }
  };

  return (
    <div
      contentEditable={false}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        userSelect: 'none',
        fontFamily: 'var(--font-family-base, sans-serif)',
      }}
    >
      {/* Barre de saisie Cunningham */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '4px',
          background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
          border: '2px solid var(--c--globals--colors--brand-primary, #000091)',
          boxShadow: '0 2px 8px rgba(0, 0, 145, 0.08)',
        }}
      >
        <span style={{ fontSize: '16px' }}>🔍</span>
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={true}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-label="Rechercher une source souveraine"
          placeholder={`Rechercher dans ${CATEGORIES.find((c) => c.type === selectedCategory)?.label}...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            background: 'transparent',
            color: 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
          }}
        />
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#666666',
          }}
          title="Annuler (Échap)"
        >
          ✕
        </button>
      </div>

      {/* Palette déroulante 100% Cunningham */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          width: '100%',
          zIndex: 100,
          boxShadow: '0 8px 24px rgba(0, 0, 145, 0.15)',
          borderRadius: '6px',
          border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
          background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
          overflow: 'hidden',
        }}
      >
        {/* Onglets de catégories */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            padding: '6px',
            background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
            borderBottom: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.type;
            return (
              <button
                key={cat.type}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.type);
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1px solid #000091' : '1px solid #e5e5e5',
                  background: isActive ? 'var(--c--globals--colors--brand-primary, #000091)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        {/* Liste des résultats */}
        <div
          id={dropdownId}
          role="listbox"
          style={{
            maxHeight: '260px',
            overflowY: 'auto',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
              }}
            >
              Aucun résultat trouvé pour « {query} ».
            </div>
          ) : (
            items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.sourceId}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--c--contextuals--border--surface--primary, #f0f0f0)',
                    background: isSelected ? 'var(--c--contextuals--background--surface--secondary, #f0f3ff)' : 'transparent',
                    transition: 'background-color 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '13px',
                        color: 'var(--c--globals--colors--brand-primary, #000091)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '420px',
                      }}
                    >
                      {item.title}
                    </div>
                    {item.status && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '8px',
                          background: '#e8f7ee',
                          color: '#0e793c',
                          flexShrink: 0,
                        }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
                        marginTop: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}
                  {item.meta1 && (
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'var(--c--contextuals--content--semantic--neutral--tertiary, #929292)',
                        marginTop: '2px',
                      }}
                    >
                      {item.meta1} {item.meta2 ? `• ${item.meta2}` : ''}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pied d'aide navigation clavier */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '6px 12px',
            background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
            borderTop: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            fontSize: '11px',
            color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
          }}
        >
          <span>↑↓ Naviguer • Entrée Valider</span>
          <span>Échap Annuler</span>
        </div>
      </div>
    </div>
  );
};

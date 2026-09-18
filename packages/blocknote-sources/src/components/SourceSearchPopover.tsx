import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';

import { ALL_INTERNATIONAL_MOCK_SOURCES, InternationalSourceItem, SupportedCountry } from '../mockData';
import { MOCK_SOURCES } from '../mockSources';
import { SourceEntityProps, SourceEntityType } from '../types';
import { SourceIcon } from './SourceIcon';

interface SourceSearchPopoverProps {
  initialType?: SourceEntityType;
  initialCountry?: SupportedCountry;
  onSelect: (entity: SourceEntityProps) => void;
  onCancel: () => void;
}

export type ThematicGroup = 'all' | 'legal' | 'economy' | 'territory';

interface ThematicTab {
  id: ThematicGroup;
  label: string;
  icon: string;
  types: SourceEntityType[];
}

const THEMATIC_TABS: ThematicTab[] = [
  {
    id: 'all',
    label: 'Toutes les sources',
    icon: '⚡',
    types: [
      'law',
      'case-law',
      'company',
      'parliament',
      'address',
      'place',
      'procurement',
      'grant',
      'statistics',
      'insee',
      'agent',
      'cadastre',
      'demarche',
      'opendata',
      'research',
      'custom',
    ],
  },
  {
    id: 'legal',
    label: 'Juridique',
    icon: '⚖️',
    types: ['law', 'case-law', 'parliament', 'custom'],
  },
  {
    id: 'economy',
    label: 'Économie',
    icon: '🏢',
    types: ['company', 'procurement', 'grant'],
  },
  {
    id: 'territory',
    label: 'Territoires',
    icon: '📍',
    types: ['address', 'place', 'cadastre', 'statistics', 'insee', 'demarche', 'opendata', 'agent', 'research'],
  },
];

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({
  initialType = 'law',
  initialCountry = 'fr',
  onSelect,
  onCancel,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<ThematicGroup>('all');
  const [selectedCategory] = useState<SourceEntityType>(initialType);
  const [selectedCountry, setSelectedCountry] = useState<SupportedCountry>(initialCountry);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownId = useId();
  const tablistId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 30);
    return () => clearTimeout(timer);
  }, []);

  const allAvailableItems: SourceEntityProps[] = React.useMemo(() => {
    if (selectedCountry === 'fr') {
      const groupConfig = THEMATIC_TABS.find((t) => t.id === selectedGroup);
      const allowedTypes = groupConfig ? groupConfig.types : [selectedCategory];

      const pool: SourceEntityProps[] = [];
      for (const t of allowedTypes) {
        if (MOCK_SOURCES[t]) {
          pool.push(...MOCK_SOURCES[t]);
        }
      }
      return pool;
    } else {
      return ALL_INTERNATIONAL_MOCK_SOURCES
        .filter((s: InternationalSourceItem) => s.country === selectedCountry)
        .map((item) => ({
          entityType: (item.entityType as SourceEntityType) || 'law',
          displayMode: 'callout' as const,
          sourceId: item.sourceId || item.id || '',
          title: item.title || '',
          subtitle: item.subtitle || '',
          status: item.statusLabel || (typeof item.status === 'string' ? item.status : '') || '',
          statusColor: item.statusColor || 'blue',
          meta1: item.meta1 || '',
          meta2: item.meta2 || '',
          meta3: item.meta3 || '',
          excerpt: item.excerpt || item.snippet || '',
          summary: item.summary || '',
          url: item.url || '',
          verifiedAt: item.verifiedAt || item.updatedAt || '',
          rawPayload: typeof item.rawPayload === 'string' ? item.rawPayload : JSON.stringify(item.rawPayload || {}),
        }));
    }
  }, [selectedCountry, selectedGroup, selectedCategory]);

  const items = allAvailableItems.filter((item) => {
    if (!query.trim()) {
      return true;
    }
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      (item.meta1 && item.meta1.toLowerCase().includes(q)) ||
      (item.meta2 && item.meta2.toLowerCase().includes(q)) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(q))
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
        userSelect: 'none',
        fontFamily: 'inherit',
      }}
    >
      {/* Barre de saisie épurée sans ombre ni bordure épaisse */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          background: 'var(--bg-surface, #f6f6f6)',
          border: '1px solid var(--border-color, #e5e5e5)',
        }}
      >
        <span style={{ fontSize: '14px', opacity: 0.6 }}>🔍</span>
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={true}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-label="Recherche de source connectée"
          placeholder="Rechercher une loi, une entreprise, une adresse, un marché..."
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
            fontSize: '13px',
            fontFamily: 'inherit',
            background: 'transparent',
            color: 'inherit',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              color: 'var(--text-muted, #888888)',
              padding: '2px 4px',
            }}
            title="Effacer la saisie"
          >
            ✕
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color, #d0d0d0)',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: 'inherit',
            color: 'var(--text-secondary, #666666)',
            padding: '2px 6px',
          }}
          title="Annuler (Échap)"
        >
          Échap
        </button>
      </div>

      {/* Palette déroulante sobre et plate */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 2px)',
          left: 0,
          width: '100%',
          zIndex: 150,
          border: '1px solid var(--border-color, #e5e5e5)',
          background: 'var(--bg-page, #ffffff)',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Navigation par Onglets simplifiée */}
        <div
          id={tablistId}
          role="tablist"
          aria-label="Catégories de données souveraines"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 8px',
            background: 'var(--bg-surface, #f6f6f6)',
            borderBottom: '1px solid var(--border-color, #e5e5e5)',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {/* Groupes Thématiques */}
          <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
            {THEMATIC_TABS.map((tab) => {
              const isActive = selectedGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={dropdownId}
                  type="button"
                  onClick={() => {
                    setSelectedGroup(tab.id);
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  style={{
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontFamily: 'inherit',
                    fontWeight: isActive ? 600 : 400,
                    border: 'none',
                    background: isActive ? 'var(--bg-page, #ffffff)' : 'transparent',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sélecteur de Pays / Presets */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {(['fr', 'de', 'nl', 'es', 'eu'] as SupportedCountry[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setSelectedCountry(c);
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                style={{
                  border: 'none',
                  background: selectedCountry === c ? 'var(--bg-page, #ffffff)' : 'transparent',
                  padding: '2px 6px',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                  fontWeight: selectedCountry === c ? 600 : 400,
                  cursor: 'pointer',
                  color: 'inherit',
                }}
              >
                {c === 'fr' ? '🇫🇷 FR' : c === 'de' ? '🇩🇪 DE' : c === 'nl' ? '🇳🇱 NL' : c === 'es' ? '🇪🇸 ES' : '🇪🇺 EU'}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des résultats (role=listbox) */}
        <div
          id={dropdownId}
          role="listbox"
          aria-label="Résultats de recherche"
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
                fontSize: '12px',
                color: 'var(--text-muted, #888888)',
              }}
            >
              Aucun résultat trouvé pour « {query} ».
            </div>
          ) : (
            items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.sourceId + index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border-color, #f0f0f0)',
                    background: isSelected ? 'var(--bg-surface, #f6f6f6)' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                      <SourceIcon type={item.entityType} size={13} color="currentColor" />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '13px',
                          color: 'inherit',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      {item.freshness && (
                        <span
                          style={{
                            fontSize: '9px',
                            fontFamily: 'monospace',
                            padding: '1px 4px',
                            background: 'var(--bg-surface, #f0f0f0)',
                            color: 'inherit',
                          }}
                        >
                          {item.freshness === 'live' ? '⚡ live' : '🕒 cache'}
                        </span>
                      )}

                      {item.status && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontFamily: 'monospace',
                            padding: '1px 5px',
                            background: 'var(--bg-surface, #f0f0f0)',
                            color: 'inherit',
                          }}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.subtitle && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted, #777777)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingLeft: '19px',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}

                  {item.excerpt && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted, #888888)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingLeft: '19px',
                      }}
                    >
                      « {item.excerpt} »
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

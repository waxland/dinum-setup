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

const TYPE_PLACEHOLDERS: Partial<Record<SourceEntityType, string>> = {
  law: 'Rechercher une loi, un article ou un code juridique...',
  company: 'Rechercher une entreprise, SIREN, dénomination...',
  parliament: 'Rechercher un amendement ou débat parlementaire...',
  address: 'Rechercher une adresse postale certifiée...',
  procurement: 'Rechercher un marché public ou avis BOAMP...',
  grant: 'Rechercher une subvention ou aide territoriale...',
  insee: 'Rechercher des statistiques ou indicateurs INSEE...',
  statistics: 'Rechercher des données statistiques...',
  agent: 'Rechercher un agent ou service public...',
  cadastre: 'Rechercher une parcelle cadastrale...',
  demarche: 'Rechercher une démarche administrative...',
  opendata: 'Rechercher un jeu de données ouvertes...',
  custom: 'Rechercher une source certifiée...',
};

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({
  initialType = 'law',
  initialCountry = 'fr',
  onSelect,
  onCancel,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  const allAvailableItems: SourceEntityProps[] = React.useMemo(() => {
    if (initialCountry === 'fr') {
      const pool: SourceEntityProps[] = [];
      if (MOCK_SOURCES[initialType]) {
        pool.push(...MOCK_SOURCES[initialType]!);
      }
      for (const [t, list] of Object.entries(MOCK_SOURCES)) {
        if (t !== initialType && Array.isArray(list)) {
          pool.push(...list);
        }
      }
      return pool;
    } else {
      return ALL_INTERNATIONAL_MOCK_SOURCES
        .filter((s: InternationalSourceItem) => s.country === initialCountry)
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
  }, [initialCountry, initialType]);

  const items = React.useMemo(() => {
    if (!query.trim()) {
      return allAvailableItems;
    }
    const q = query.toLowerCase();
    return allAvailableItems.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      (item.meta1 && item.meta1.toLowerCase().includes(q)) ||
      (item.meta2 && item.meta2.toLowerCase().includes(q)) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(q))
    );
  }, [allAvailableItems, query]);

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

  const placeholder = TYPE_PLACEHOLDERS[initialType] || 'Rechercher une source souveraine...';

  return (
    <div
      contentEditable={false}
      style={{
        position: 'relative',
        width: '100%',
        userSelect: 'none',
        fontFamily: 'inherit',
        margin: '4px 0',
      }}
    >
      {/* Barre de saisie sobre et plate */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'var(--bg-page, #ffffff)',
          border: '1px solid var(--border-color, #e5e5e5)',
          borderRadius: '4px',
        }}
      >
        <SourceIcon type={initialType} size={15} color="currentColor" />
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={true}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-label="Recherche de source"
          placeholder={placeholder}
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
            color: 'var(--text-primary, #161616)',
            padding: '2px 0',
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
              fontSize: '12px',
              color: 'var(--text-muted, #888888)',
              padding: '2px 6px',
            }}
            title="Effacer"
          >
            ✕
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color, #dcdcdc)',
            borderRadius: '3px',
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

      {/* Liste déroulante des résultats */}
      <div
        id={dropdownId}
        role="listbox"
        aria-label="Résultats de recherche"
        style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'var(--bg-page, #ffffff)',
          border: '1px solid var(--border-color, #e5e5e5)',
          borderRadius: '4px',
          maxHeight: '260px',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              padding: '12px',
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <SourceIcon type={item.entityType} size={13} color="currentColor" />
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: '13px',
                        color: 'var(--text-primary, #161616)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {item.status && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        padding: '1px 5px',
                        background: 'var(--bg-surface, #f0f0f0)',
                        color: 'var(--text-secondary, #666666)',
                        borderRadius: '2px',
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

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
    label: 'Juridique & Lois',
    icon: '⚖️',
    types: ['law', 'case-law', 'parliament', 'custom'],
  },
  {
    id: 'economy',
    label: 'Économie & Marchés',
    icon: '🏢',
    types: ['company', 'procurement', 'grant'],
  },
  {
    id: 'territory',
    label: 'Territoires & Données',
    icon: '📍',
    types: ['address', 'place', 'cadastre', 'statistics', 'insee', 'demarche', 'opendata', 'agent', 'research'],
  },
];

const CATEGORIES: { type: SourceEntityType; label: string; icon: string; group: ThematicGroup }[] = [
  { type: 'law', label: 'Loi & Règlements', icon: '⚖️', group: 'legal' },
  { type: 'case-law', label: 'Jurisprudence', icon: '📜', group: 'legal' },
  { type: 'company', label: 'Fiche Entreprise (RNE)', icon: '🏢', group: 'economy' },
  { type: 'parliament', label: 'Débats & Amendements', icon: '🏛️', group: 'legal' },
  { type: 'address', label: 'Adresse Certifiée (BAN)', icon: '📍', group: 'territory' },
  { type: 'place', label: 'Lieu & POI', icon: '🗺️', group: 'territory' },
  { type: 'procurement', label: 'Marchés Publics (BOAMP)', icon: '🛍️', group: 'economy' },
  { type: 'grant', label: 'Aides & Subventions', icon: '💶', group: 'economy' },
  { type: 'statistics', label: 'Statistiques Publiques', icon: '📈', group: 'territory' },
  { type: 'insee', label: 'Stats Démographiques', icon: '📊', group: 'territory' },
  { type: 'agent', label: 'Annuaire Service Public', icon: '👤', group: 'territory' },
  { type: 'cadastre', label: 'Cadastre & Parcelles', icon: '🗺️', group: 'territory' },
  { type: 'demarche', label: 'Démarches Administratives', icon: '📝', group: 'territory' },
  { type: 'opendata', label: 'Open Data (data.gouv.fr)', icon: '🌐', group: 'territory' },
  { type: 'research', label: 'Recherche & Publications', icon: '🔬', group: 'territory' },
  { type: 'custom', label: 'Albert IA Souveraine RAG', icon: '🧠', group: 'legal' },
];

export const SourceSearchPopover: React.FC<SourceSearchPopoverProps> = ({
  initialType = 'law',
  initialCountry = 'fr',
  onSelect,
  onCancel,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<ThematicGroup>('all');
  const [selectedCategory, setSelectedCategory] = useState<SourceEntityType>(initialType);
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
    }, 50);
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
    if (!query.trim()) return true;
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
        maxWidth: '680px',
        userSelect: 'none',
        fontFamily: 'var(--font-family-base, Marianne, sans-serif)',
      }}
    >
      {/* Barre de saisie DSFR / Cunningham */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: '8px',
          background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
          border: '2px solid var(--c--globals--colors--brand-primary, #000091)',
          boxShadow: '0 4px 14px rgba(0, 0, 145, 0.12)',
        }}
      >
        <span style={{ fontSize: '18px' }}>🔍</span>
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={true}
          aria-controls={dropdownId}
          aria-autocomplete="list"
          aria-label="Search connected source"
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
            fontSize: '14px',
            fontWeight: 500,
            background: 'transparent',
            color: 'var(--c--contextuals--content--semantic--neutral--primary, #161616)',
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
              color: '#929292',
              padding: '2px 6px',
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
            background: '#f6f6f6',
            border: '1px solid #e5e5e5',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700,
            color: '#666666',
            padding: '3px 8px',
          }}
          title="Annuler (Échap)"
        >
          Échap
        </button>
      </div>

      {/* Palette déroulante 100% DSFR & Cunningham */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          width: '100%',
          zIndex: 150,
          boxShadow: '0 12px 32px rgba(0, 0, 145, 0.16)',
          borderRadius: '8px',
          border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
          background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
          overflow: 'hidden',
        }}
      >
        {/* Navigation par Onglets (Tabs DSFR role=tablist) */}
        <div
          id={tablistId}
          role="tablist"
          aria-label="Catégories de données souveraines"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 8px',
            background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
            borderBottom: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          {/* Groupes Thématiques */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
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
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid #000091' : '1px solid transparent',
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#000091' : '#666666',
                    boxShadow: isActive ? '0 1px 3px rgba(0, 0, 145, 0.1)' : 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sélecteur de Pays / Presets */}
          <div style={{ display: 'flex', gap: '2px', background: '#eef0f5', padding: '2px', borderRadius: '6px' }}>
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
                  background: selectedCountry === c ? '#ffffff' : 'transparent',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: selectedCountry === c ? 700 : 500,
                  cursor: 'pointer',
                  color: selectedCountry === c ? '#000091' : '#666666',
                  boxShadow: selectedCountry === c ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
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
          aria-label="Résultats de recherche souveraine"
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                padding: '24px 16px',
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
              }}
            >
              Aucun résultat certifié trouvé pour « {query} ».
            </div>
          ) : (
            items.map((item, index) => {
              const isSelected = index === selectedIndex;
              const catConfig = CATEGORIES.find((c) => c.type === item.entityType);
              return (
                <div
                  key={item.sourceId + index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--c--contextuals--border--surface--primary, #f0f0f0)',
                    background: isSelected ? 'var(--c--contextuals--background--surface--secondary, #f0f3ff)' : 'transparent',
                    transition: 'background-color 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          background: isSelected ? 'var(--blue-france-975, #f5f5fe)' : 'rgba(0, 0, 145, 0.04)',
                          color: 'var(--blue-france-sun-113, #000091)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <SourceIcon type={item.entityType} size={15} color="currentColor" />
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '13px',
                          color: isSelected ? 'var(--c--globals--colors--brand-primary, #000091)' : 'var(--c--contextuals--content--semantic--neutral--primary, #161616)',
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
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: item.statusColor === 'green' ? '#e8f7ee' : item.statusColor === 'purple' ? '#f3e8ff' : '#e8edff',
                          color: item.statusColor === 'green' ? '#0e793c' : item.statusColor === 'purple' ? '#6b21a8' : '#0063cb',
                          border: '1px solid transparent',
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
                        marginTop: '3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingLeft: '21px',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}

                  {item.excerpt && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--c--contextuals--content--semantic--neutral--tertiary, #4a5568)',
                        marginTop: '3px',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingLeft: '21px',
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

        {/* Pied d'aide navigation clavier & Certification */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 14px',
            background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
            borderTop: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            fontSize: '11px',
            color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span><kbd style={{ background: '#ffffff', padding: '1px 4px', borderRadius: '3px', border: '1px solid #ccc' }}>↑</kbd><kbd style={{ background: '#ffffff', padding: '1px 4px', borderRadius: '3px', border: '1px solid #ccc' }}>↓</kbd> Naviguer</span>
            <span>•</span>
            <span><kbd style={{ background: '#ffffff', padding: '1px 4px', borderRadius: '3px', border: '1px solid #ccc' }}>↵</kbd> Valider</span>
            <span>•</span>
            <span><kbd style={{ background: '#ffffff', padding: '1px 4px', borderRadius: '3px', border: '1px solid #ccc' }}>Échap</kbd> Fermer</span>
          </div>
          <span style={{ fontWeight: 600, color: '#000091' }}>
            🔒 Sources Souveraines Certifiées
          </span>
        </div>
      </div>
    </div>
  );
};

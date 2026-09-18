import { createReactInlineContentSpec } from '@blocknote/react';
import React, { useState } from 'react';

import { SOURCE_ENTITY_TYPES, SourceEntityType } from '../types';

export const SOURCE_INLINE_ICONS: Record<SourceEntityType, string> = {
  law: '⚖️',
  'case-law': '📜',
  company: '🏢',
  parliament: '🏛️',
  address: '📍',
  place: '🗺️',
  procurement: '🛍️',
  grant: '💶',
  statistics: '📈',
  insee: '📊',
  agent: '👤',
  cadastre: '🗺️',
  demarche: '📝',
  opendata: '🌐',
  research: '🔬',
  custom: '🧠',
};

export const SOURCE_INLINE_LABELS: Record<SourceEntityType, string> = {
  law: 'Légifrance',
  'case-law': 'Jurisprudence',
  company: 'RNE / Entreprise',
  parliament: 'Assemblée Nationale',
  address: 'Base Adresse Nationale',
  place: 'Lieu / POI',
  procurement: 'Marchés Publics',
  grant: 'Aides-Territoires',
  statistics: 'Statistiques Publiques',
  insee: 'INSEE',
  agent: 'Service Public',
  cadastre: 'Cadastre DGFiP',
  demarche: 'Démarches-Simplifiées',
  opendata: 'data.gouv.fr',
  research: 'Recherche Publique',
  custom: 'Albert IA',
};

interface SourceInlineProps {
  inlineContent: {
    props: {
      sourceId: string;
      title: string;
      subtitle?: string;
      entityType: SourceEntityType;
      status?: string;
      url?: string;
      excerpt?: string;
      verifiedAt?: string;
    };
  };
}

export const SourceInlineBadge: React.FC<SourceInlineProps> = ({ inlineContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { sourceId, title, subtitle, entityType, status, url, excerpt, verifiedAt } = inlineContent.props;
  const icon = SOURCE_INLINE_ICONS[entityType] || '📜';
  const providerName = SOURCE_INLINE_LABELS[entityType] || 'Source Souveraine';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <span
      className="bn-inline-source-badge-wrap"
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'baseline',
        userSelect: 'none',
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Badge Inline DSFR / Cunningham */}
      <span
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '2px 8px',
          margin: '0 2px',
          borderRadius: '4px',
          background: 'var(--blue-france-975, #f5f5fe)',
          border: '1px solid var(--blue-france-925, #e3e3fd)',
          color: 'var(--blue-france-sun-113, #000091)',
          fontSize: '0.85em',
          fontWeight: 600,
          fontFamily: 'var(--font-family-base, Marianne, sans-serif)',
          cursor: 'pointer',
          lineHeight: '1.4',
          transition: 'all 0.15s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 145, 0.05)',
        }}
      >
        <span style={{ fontSize: '1.1em' }}>{icon}</span>
        <span
          style={{
            maxWidth: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title || providerName}
        </span>
        {status && (
          <span
            style={{
              fontSize: '0.75em',
              fontWeight: 700,
              padding: '1px 5px',
              borderRadius: '8px',
              background: '#e8f7ee',
              color: '#0e793c',
            }}
          >
            {status}
          </span>
        )}
      </span>

      {/* Popover Flottant de Prévisualisation (Interlinking Preview) */}
      {isOpen && (
        <span
          role="dialog"
          aria-label={`Détails de la source ${title}`}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '320px',
            background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
            border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 145, 0.15), 0 2px 6px rgba(0,0,0,0.06)',
            padding: '14px',
            zIndex: 300,
            textAlign: 'left',
            display: 'block',
            cursor: 'default',
            fontFamily: 'var(--font-family-base, Marianne, sans-serif)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header du Popover */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue-france-sun-113, #000091)', textTransform: 'uppercase' }}>
                  {providerName}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#161616', marginTop: '1px', lineHeight: '1.3' }}>
                  {title}
                </div>
              </div>
            </div>
            {status && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  background: '#e8f7ee',
                  color: '#0e793c',
                  flexShrink: 0,
                }}
              >
                {status}
              </span>
            )}
          </div>

          {/* Sous-titre & Extrait */}
          {subtitle && (
            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '6px' }}>
              {subtitle}
            </div>
          )}
          {excerpt && (
            <div style={{ fontSize: '11px', color: '#333333', fontStyle: 'italic', background: '#f8f8fb', padding: '8px', borderRadius: '4px', borderLeft: '3px solid #000091', marginBottom: '10px', lineHeight: '1.4' }}>
              « {excerpt} »
            </div>
          )}

          {/* Footer & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #eeeeee', fontSize: '11px' }}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--blue-france-sun-113, #000091)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                Consulter la source ↗
              </a>
            ) : (
              <span style={{ color: '#999999' }}>ID: {sourceId}</span>
            )}

            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 600,
                color: copied ? '#0e793c' : '#666666',
              }}
            >
              {copied ? '✓ Copié' : '📋 Copier lien'}
            </button>
          </div>
        </span>
      )}
    </span>
  );
};

export const SourceInlineContent = createReactInlineContentSpec(
  {
    type: 'sourceLink',
    propSchema: {
      sourceId: { default: '' },
      title: { default: '' },
      subtitle: { default: '' },
      entityType: { default: 'law', values: SOURCE_ENTITY_TYPES },
      status: { default: '' },
      url: { default: '' },
      excerpt: { default: '' },
      verifiedAt: { default: '' },
    },
    content: 'none',
  },
  {
    render: (props) => <SourceInlineBadge inlineContent={props.inlineContent} />,
  }
);

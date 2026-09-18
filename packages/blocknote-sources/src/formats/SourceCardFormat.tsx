import React from 'react';
import { SourceEntityProps } from '../types';

interface SourceCardFormatProps {
  props: SourceEntityProps;
}

export const SourceCardFormat: React.FC<SourceCardFormatProps> = ({ props }) => {
  return (
    <div
      contentEditable={false}
      style={{
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
        background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
        boxShadow: '0 1px 4px rgba(0, 0, 145, 0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
            }}
          >
            {props.title}
          </div>
          {props.subtitle && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
              }}
            >
              {props.subtitle}
            </div>
          )}
        </div>

        {props.status && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px',
              background: '#e8edff',
              color: 'var(--c--globals--colors--brand-primary, #000091)',
              border: '1px solid var(--c--globals--colors--brand-primary, #000091)',
            }}
          >
            {props.status}
          </span>
        )}
      </div>

      {/* Grid de 3 colonnes de métadonnées */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '8px',
          padding: '8px',
          borderRadius: '3px',
          background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
          marginBottom: '8px',
          fontSize: '11px',
        }}
      >
        <div>
          <div style={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase' }}>
            Reference
          </div>
          <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {props.meta1 || props.sourceId || '—'}
          </div>
        </div>

        <div>
          <div style={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase' }}>
            Key Attribute
          </div>
          <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {props.meta2 || '—'}
          </div>
        </div>

        <div>
          <div style={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase' }}>
            Date / Validity
          </div>
          <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {props.meta3 || props.verifiedAt || '—'}
          </div>
        </div>
      </div>

      {props.summary && (
        <p style={{ margin: '6px 0', fontSize: '13px', lineHeight: 1.4, color: '#333333' }}>
          {props.summary}
        </p>
      )}

      {props.url && (
        <div style={{ textAlign: 'right', marginTop: '4px' }}>
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px',
              color: 'var(--c--globals--colors--brand-primary, #000091)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Ouvrir la fiche officielle ↗
          </a>
        </div>
      )}
    </div>
  );
};

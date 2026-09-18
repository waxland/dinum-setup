import React, { useState } from 'react';
import { SourceIcon } from '../components/SourceIcon';
import { SourceEntityProps } from '../types';

interface SourceLinkFormatProps {
  props: SourceEntityProps;
}

export const SourceLinkFormat: React.FC<SourceLinkFormatProps> = ({ props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      contentEditable={false}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsVisible(false);
        }
      }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: '0 2px',
      }}
    >
      <a
        href={props.url || '#'}
        target={props.url ? '_blank' : undefined}
        rel={props.url ? 'noopener noreferrer' : undefined}
        aria-haspopup="dialog"
        aria-expanded={isVisible}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '1px 6px',
          background: 'var(--bg-surface, #f0f0f0)',
          border: '1px solid var(--border-color, #e5e5e5)',
          color: 'inherit',
          fontSize: '12px',
          fontWeight: 500,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <SourceIcon type={props.entityType} size={12} color="currentColor" />
        <span style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {props.title}
        </span>
        {props.status && (
          <span style={{ opacity: 0.7, fontSize: '10px', fontFamily: 'monospace' }}>({props.status})</span>
        )}
      </a>

      {isVisible && (props.subtitle || props.summary || props.excerpt) && (
        <div
          role="dialog"
          aria-label={`Aperçu de la source ${props.title}`}
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 50,
            minWidth: '240px',
            maxWidth: '340px',
            padding: '8px 10px',
            background: 'var(--bg-page, #ffffff)',
            border: '1px solid var(--border-color, #e5e5e5)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {props.subtitle && (
            <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '2px' }}>
              {props.subtitle}
            </div>
          )}
          <div style={{ fontSize: '11px', color: 'var(--text-muted, #666666)', lineHeight: 1.4 }}>
            {props.summary || props.excerpt}
          </div>
        </div>
      )}
    </span>
  );
};

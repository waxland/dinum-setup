import React, { useState } from 'react';
import { SourceEntityProps } from '../types';

interface SourceLinkFormatProps {
  props: SourceEntityProps;
}

export const SourceLinkFormat: React.FC<SourceLinkFormatProps> = ({ props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      contentEditable={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          borderRadius: '4px',
          background: 'var(--c--contextuals--background--surface--secondary, #e8edff)',
          border: '1px solid var(--c--globals--colors--brand-primary, #000091)',
          color: 'var(--c--globals--colors--brand-primary, #000091)',
          fontSize: '12px',
          fontWeight: 600,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <span>📌</span>
        <span style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {props.title}
        </span>
        {props.status && (
          <span style={{ opacity: 0.85, fontSize: '11px' }}>({props.status})</span>
        )}
      </a>

      {isHovered && (props.subtitle || props.summary || props.excerpt) && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 50,
            minWidth: '260px',
            maxWidth: '360px',
            padding: '8px 12px',
            borderRadius: '4px',
            background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
            border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            pointerEvents: 'none',
          }}
        >
          {props.subtitle && (
            <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>
              {props.subtitle}
            </div>
          )}
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
            {props.summary || props.excerpt}
          </div>
        </div>
      )}
    </span>
  );
};

import React from 'react';
import { DisplayMode } from '../types';

interface SourceBlockToolbarProps {
  currentMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
  url?: string;
  sourceTypeLabel: string;
}

export const SourceBlockToolbar: React.FC<SourceBlockToolbarProps> = ({
  currentMode,
  onModeChange,
  url,
  sourceTypeLabel,
}) => {
  return (
    <div
      contentEditable={false}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '4px 8px',
        background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
        border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
        borderRadius: '4px',
        marginBottom: '6px',
        userSelect: 'none',
        fontSize: '11px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--c--globals--colors--brand-primary, #000091)',
          }}
        >
          {sourceTypeLabel}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onModeChange('callout');
          }}
          style={{
            padding: '2px 8px',
            borderRadius: '3px',
            fontSize: '11px',
            fontWeight: currentMode === 'callout' ? 700 : 500,
            border: currentMode === 'callout' ? '1px solid #000091' : '1px solid #ccc',
            background: currentMode === 'callout' ? 'var(--c--globals--colors--brand-primary, #000091)' : '#ffffff',
            color: currentMode === 'callout' ? '#ffffff' : 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
            cursor: 'pointer',
          }}
          title="Callout Format"
        >
          Encadré
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onModeChange('card');
          }}
          style={{
            padding: '2px 8px',
            borderRadius: '3px',
            fontSize: '11px',
            fontWeight: currentMode === 'card' ? 700 : 500,
            border: currentMode === 'card' ? '1px solid #000091' : '1px solid #ccc',
            background: currentMode === 'card' ? 'var(--c--globals--colors--brand-primary, #000091)' : '#ffffff',
            color: currentMode === 'card' ? '#ffffff' : 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
            cursor: 'pointer',
          }}
          title="Card Format"
        >
          Carte
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onModeChange('link');
          }}
          style={{
            padding: '2px 8px',
            borderRadius: '3px',
            fontSize: '11px',
            fontWeight: currentMode === 'link' ? 700 : 500,
            border: currentMode === 'link' ? '1px solid #000091' : '1px solid #ccc',
            background: currentMode === 'link' ? 'var(--c--globals--colors--brand-primary, #000091)' : '#ffffff',
            color: currentMode === 'link' ? '#ffffff' : 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
            cursor: 'pointer',
          }}
          title="Link Format"
        >
          Lien
        </button>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              padding: '2px 6px',
              textDecoration: 'none',
              color: 'var(--c--globals--colors--brand-primary, #000091)',
              fontWeight: 600,
              fontSize: '11px',
            }}
            title="View official source"
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
};

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
        gap: '6px',
        padding: '2px 0',
        marginBottom: '4px',
        userSelect: 'none',
        fontSize: '11px',
        color: 'var(--text-muted, #777777)',
      }}
    >
      <span style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.04em' }}>
        {sourceTypeLabel}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {(['callout', 'card', 'link'] as const).map((mode) => {
          const label = mode === 'callout' ? 'Encadré' : mode === 'card' ? 'Carte' : 'Lien';
          const isActive = currentMode === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onModeChange(mode);
              }}
              style={{
                padding: '1px 5px',
                fontSize: '10px',
                fontFamily: 'inherit',
                fontWeight: isActive ? 600 : 400,
                border: '1px solid var(--border-color, #e5e5e5)',
                background: isActive ? 'var(--bg-surface, #e5e5e5)' : 'transparent',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          );
        })}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1px 4px',
              fontSize: '11px',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '2px',
            }}
            title="Ouvrir la source officielle"
          >
            ↗
          </a>
        )}
      </div>
    </div>
  );
};

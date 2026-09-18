import React from 'react';
import { SourceIcon } from '../components/SourceIcon';
import { SourceEntityProps } from '../types';

interface SourceCardFormatProps {
  props: SourceEntityProps;
}

export const SourceCardFormat: React.FC<SourceCardFormatProps> = ({ props }) => {
  return (
    <div
      contentEditable={false}
      style={{
        padding: '12px 14px',
        border: '1px solid var(--border-color, #e5e5e5)',
        background: 'var(--bg-page, #ffffff)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <SourceIcon type={props.entityType} size={14} color="currentColor" />
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'inherit',
              }}
            >
              {props.title}
            </div>
            {props.subtitle && (
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted, #777777)',
                }}
              >
                {props.subtitle}
              </div>
            )}
          </div>
        </div>

        {props.status && (
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              padding: '1px 5px',
              background: 'var(--bg-surface, #f6f6f6)',
              border: '1px solid var(--border-color, #e5e5e5)',
              color: 'inherit',
            }}
          >
            {props.status}
          </span>
        )}
      </div>

      {(props.summary || props.excerpt) && (
        <div
          style={{
            fontSize: '12px',
            color: 'inherit',
            lineHeight: 1.5,
            margin: '6px 0',
          }}
        >
          {props.summary || props.excerpt}
        </div>
      )}

      {(props.meta1 || props.meta2 || props.meta3) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '6px',
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid var(--border-color, #ebebeb)',
            fontSize: '11px',
            color: 'var(--text-muted, #777777)',
          }}
        >
          {props.meta1 && <div>{props.meta1}</div>}
          {props.meta2 && <div>{props.meta2}</div>}
          {props.meta3 && <div>{props.meta3}</div>}
        </div>
      )}
    </div>
  );
};

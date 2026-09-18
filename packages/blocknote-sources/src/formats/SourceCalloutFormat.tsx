import React from 'react';
import { SourceIcon } from '../components/SourceIcon';
import { SourceEntityProps } from '../types';

interface SourceCalloutFormatProps {
  props: SourceEntityProps;
}

export const SourceCalloutFormat: React.FC<SourceCalloutFormatProps> = ({ props }) => {
  return (
    <div
      contentEditable={false}
      style={{
        padding: '12px 14px',
        borderLeft: '3px solid var(--blue-france, #000091)',
        borderTop: '1px solid var(--border-color, #e5e5e5)',
        borderRight: '1px solid var(--border-color, #e5e5e5)',
        borderBottom: '1px solid var(--border-color, #e5e5e5)',
        background: 'var(--bg-surface, #f9f9fb)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <SourceIcon type={props.entityType} size={14} color="currentColor" />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {props.title}
          </span>
          {props.subtitle && (
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-muted, #777777)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              • {props.subtitle}
            </span>
          )}
        </div>

        {props.status && (
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              padding: '1px 5px',
              background: 'var(--bg-page, #ffffff)',
              border: '1px solid var(--border-color, #e5e5e5)',
              color: 'inherit',
            }}
          >
            {props.status}
          </span>
        )}
      </div>

      {props.excerpt && (
        <div
          style={{
            fontSize: '12px',
            color: 'inherit',
            lineHeight: 1.5,
            fontStyle: 'italic',
            marginTop: '4px',
          }}
        >
          « {props.excerpt} »
        </div>
      )}

      {props.summary && !props.excerpt && (
        <div
          style={{
            fontSize: '12px',
            color: 'inherit',
            lineHeight: 1.5,
            marginTop: '4px',
          }}
        >
          {props.summary}
        </div>
      )}

      {(props.meta1 || props.meta2 || props.meta3) && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid var(--border-color, #ebebeb)',
            fontSize: '11px',
            color: 'var(--text-muted, #777777)',
            flexWrap: 'wrap',
          }}
        >
          {props.meta1 && <span>{props.meta1}</span>}
          {props.meta2 && <span>{props.meta2}</span>}
          {props.meta3 && <span>{props.meta3}</span>}
        </div>
      )}
    </div>
  );
};

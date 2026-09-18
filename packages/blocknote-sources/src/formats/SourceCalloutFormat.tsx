import React from 'react';
import { SourceEntityProps } from '../types';

interface SourceCalloutFormatProps {
  props: SourceEntityProps;
}

export const SourceCalloutFormat: React.FC<SourceCalloutFormatProps> = ({ props }) => {
  return (
    <div
      contentEditable={false}
      style={{
        padding: '16px',
        borderRadius: '4px',
        borderLeft: '4px solid var(--c--globals--colors--brand-primary, #000091)',
        borderTop: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
        borderRight: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
        borderBottom: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
        background: 'var(--c--contextuals--background--surface--secondary, #f8f8fb)',
        boxShadow: '0 1px 3px rgba(0, 0, 145, 0.05)',
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
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
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
                fontSize: '12px',
                color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
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
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px',
              background: '#e8f7ee',
              color: '#0e793c',
              border: '1px solid #9de2b8',
              flexShrink: 0,
            }}
          >
            {props.status}
          </span>
        )}
      </div>

      {(props.meta1 || props.meta2 || props.meta3) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '8px',
            fontSize: '11px',
            color: 'var(--c--contextuals--content--semantic--neutral--secondary, #666666)',
          }}
        >
          {props.meta1 && (
            <span style={{ padding: '2px 6px', background: '#eeeeee', borderRadius: '3px' }}>
              {props.meta1}
            </span>
          )}
          {props.meta2 && (
            <span style={{ padding: '2px 6px', background: '#eeeeee', borderRadius: '3px' }}>
              {props.meta2}
            </span>
          )}
          {props.meta3 && (
            <span style={{ padding: '2px 6px', background: '#eeeeee', borderRadius: '3px' }}>
              {props.meta3}
            </span>
          )}
        </div>
      )}

      {props.excerpt && (
        <div
          style={{
            margin: '6px 0',
            padding: '8px 12px',
            background: 'var(--c--contextuals--background--surface--primary, #ffffff)',
            border: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
            borderRadius: '3px',
            fontStyle: 'italic',
            fontSize: '13px',
            lineHeight: 1.5,
            color: 'var(--c--contextuals--content--semantic--neutral--primary, #1e1e1e)',
          }}
        >
          « {props.excerpt} »
        </div>
      )}

      {props.summary && !props.excerpt && (
        <p style={{ margin: '6px 0', fontSize: '13px', lineHeight: 1.4, color: '#333333' }}>
          {props.summary}
        </p>
      )}

      <div
        style={{
          marginTop: '8px',
          paddingTop: '6px',
          borderTop: '1px solid var(--c--contextuals--border--surface--primary, #e5e5e5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--c--contextuals--content--semantic--neutral--tertiary, #929292)',
        }}
      >
        <span>{props.verifiedAt ? `Verified on ${props.verifiedAt}` : 'Official verified source'}</span>
        {props.url && (
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--c--globals--colors--brand-primary, #000091)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View on official platform ↗
          </a>
        )}
      </div>
    </div>
  );
};

// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { SourceSearchPopover } from '../../src/components/SourceSearchPopover';
import { createHttpSourceClient } from '../../src/searchClient';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('selects a non-fixture HTTP record and preserves its identity and payload', async () => {
  const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ results: [{
    source_id: 'not-in-fixtures', entity_type: 'law', display_mode: 'card',
    title: 'Remote regression record', provider: 'remote-plugin', origin: 'upstream',
    raw_payload: { preserved_key: ['value'] },
  }] })));
  vi.stubGlobal('fetch', fetch);
  const onSelect = vi.fn();
  render(<SourceSearchPopover client={createHttpSourceClient('/sources')} onSelect={onSelect} onCancel={vi.fn()} />);
  const input = screen.getByRole('combobox', { name: 'Rechercher une source' });
  fireEvent.change(input, { target: { value: 'Remote' } });
  await screen.findByRole('option', { name: 'Remote regression record' });
  expect(fetch.mock.calls[0]?.[0]).toBe('/sources/search/?type=law&q=Remote&limit=10');
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({
    sourceId: 'not-in-fixtures', provider: 'remote-plugin', origin: 'upstream',
    rawPayload: '{"preserved_key":["value"]}', verifiedAt: undefined,
  }));
});

it('announces an unavailable provider without injecting fixtures', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })));
  render(<SourceSearchPopover client={createHttpSourceClient('/sources')} onSelect={vi.fn()} onCancel={vi.fn()} />);
  fireEvent.change(screen.getByRole('combobox', { name: 'Rechercher une source' }), { target: { value: 'commande' } });
  await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Fournisseur indisponible'));
  expect(screen.queryAllByRole('option').filter((item) => item.tagName !== 'OPTION')).toHaveLength(0);
});

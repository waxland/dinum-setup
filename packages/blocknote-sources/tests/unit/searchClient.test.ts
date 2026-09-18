import { afterEach, expect, it, vi } from 'vitest';
import { createHttpSourceClient, parseSearchResponse } from '../../src/searchClient';

afterEach(() => vi.unstubAllGlobals());

it('converts Django fields without renaming nested payload keys', () => {
  expect(parseSearchResponse({ results: [{ source_id: 'external-id', entity_type: 'law', display_mode: 'callout', title: 'Result', status_color: 'green', verified_at: null, raw_payload: { original_key: 1 } }] })).toEqual([
    expect.objectContaining({ sourceId: 'external-id', entityType: 'law', statusColor: 'green', verifiedAt: undefined, rawPayload: '{"original_key":1}' }),
  ]);
});

it('rejects invalid records instead of returning a misleading empty success', () => {
  expect(() => parseSearchResponse({ results: [{ title: 'missing identity' }] })).toThrow('Invalid source record');
  expect(() => parseSearchResponse({})).toThrow('Invalid search response');
});

it('sends the resolved provider and propagates authentication failures without mocks', async () => {
  const transport = vi.fn().mockResolvedValue(new Response('{}', { status: 403 }));
  vi.stubGlobal('fetch', transport);
  const client = createHttpSourceClient('/sources', () => 'justice-ca');
  await expect(client({ entityType: 'law', country: 'ca', query: 'a & b', limit: 10, signal: new AbortController().signal })).rejects.toThrow('Authentification');
  expect(transport.mock.calls[0]?.[0]).toBe('/sources/search/?type=justice-ca&q=a+%26+b&limit=10');
});

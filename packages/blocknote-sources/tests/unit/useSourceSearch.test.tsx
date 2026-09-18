// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useSourceSearch } from '../../src/hooks/useSourceSearch';
import type { SourceSearchClient } from '../../src/searchClient';
import type { SourceEntityProps } from '../../src/types';

const record: SourceEntityProps = { entityType: 'law', displayMode: 'callout', sourceId: 'remote-id', title: 'Remote record' };
const deferred = () => {
  let resolve: (value: SourceEntityProps[]) => void = () => { throw new Error('Not initialized'); };
  let reject: (error: Error) => void = () => { throw new Error('Not initialized'); };
  const promise = new Promise<SourceEntityProps[]>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });

it('ignores an old response and its finally while a new search is pending', async () => {
  const first = deferred();
  const second = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: 'law', client }));
  act(() => result.current.setQuery('old'));
  await act(() => vi.advanceTimersByTimeAsync(250));
  act(() => result.current.setQuery('new'));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(client.mock.calls[0]?.[0].signal.aborted).toBe(true);
  await act(async () => first.resolve([{ ...record, title: 'Old' }]));
  expect(result.current.results).toEqual([]);
  expect(result.current.isLoading).toBe(true);
  await act(async () => second.resolve([record]));
  expect(result.current.results).toEqual([record]);
  expect(result.current.isLoading).toBe(false);
});

it('clearing or resetting cancels a request even when the client ignores abort', async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: 'law', client }));
  act(() => result.current.setQuery('query'));
  await act(() => vi.advanceTimersByTimeAsync(250));
  act(() => result.current.reset());
  await act(async () => pending.resolve([record]));
  expect(result.current.query).toBe('');
  expect(result.current.results).toEqual([]);
  expect(result.current.error).toBeNull();
  expect(result.current.isLoading).toBe(false);
});

it('immediate search cancels debounce, resolves after the request, and runs only once', async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: 'law', client }));
  act(() => result.current.setQuery('scheduled'));
  let completion: Promise<void> | undefined;
  act(() => { completion = result.current.searchImmediate('now'); });
  expect(client).toHaveBeenCalledTimes(1);
  await act(async () => { pending.resolve([record]); await completion; });
  await act(() => vi.advanceTimersByTimeAsync(1000));
  expect(client).toHaveBeenCalledTimes(1);
  expect(result.current.query).toBe('now');
  expect(result.current.results).toEqual([record]);
});

it('aborts on country changes and unmount without displaying a late error', async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result, rerender, unmount } = renderHook(({ country }: { country: 'fr' | 'ca' }) => useSourceSearch({ entityType: 'law', country, client }), { initialProps: { country: 'fr' } });
  act(() => result.current.setQuery('test'));
  await act(() => vi.advanceTimersByTimeAsync(250));
  rerender({ country: 'ca' });
  expect(client.mock.calls[0]?.[0].signal.aborted).toBe(true);
  unmount();
  await act(async () => pending.reject(new Error('late failure')));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(client).toHaveBeenCalledTimes(1);
});

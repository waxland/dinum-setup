import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createHttpSourceClient, SourceSearchClient } from '../searchClient';
import type { SupportedCountry } from '../mockData';
import { SourceEntityProps, SourceEntityType } from '../types';

export interface UseSourceSearchOptions {
  entityType: SourceEntityType;
  country?: SupportedCountry;
  apiBaseUrl?: string;
  client?: SourceSearchClient;
  debounceMs?: number;
}

export interface UseSourceSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SourceEntityProps[];
  isLoading: boolean;
  error: string | null;
  searchImmediate: (query: string) => Promise<void>;
  reset: () => void;
}

/** A generation owns every state update, even if the client ignores cancellation. */
export function useSourceSearch({ entityType, country = 'fr', apiBaseUrl, client, debounceMs = 250 }: UseSourceSearchOptions): UseSourceSearchResult {
  const httpClient = useMemo(() => createHttpSourceClient(apiBaseUrl), [apiBaseUrl]);
  const search = client || httpClient;
  const [query, updateQuery] = useState('');
  const currentQuery = useRef('');
  const [results, setResults] = useState<SourceEntityProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    generation.current += 1;
    controller.current?.abort();
    if (timer.current !== null) {clearTimeout(timer.current);}
    timer.current = null;
  }, []);

  const execute = useCallback(async (value: string) => {
    const current = generation.current;
    const abort = new AbortController();
    controller.current = abort;
    try {
      const records = await search({ entityType, country, query: value.trim(), limit: 10, signal: abort.signal });
      if (generation.current === current) {setResults(records);}
    } catch (err: unknown) {
      if (generation.current === current && !abort.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Recherche impossible.');
      }
    } finally {
      if (generation.current === current) {setIsLoading(false);}
    }
  }, [country, entityType, search]);

  const schedule = useCallback(async (value: string, immediate: boolean) => {
    cancel();
    currentQuery.current = value;
    updateQuery(value);
    setResults([]);
    setError(null);
    setIsLoading(Boolean(value.trim()));
    if (!value.trim()) {return;}
    if (immediate) {await execute(value);}
    else {timer.current = setTimeout(() => { void execute(value); }, debounceMs);}
  }, [cancel, execute, debounceMs]);

  useEffect(() => {
    void schedule(currentQuery.current, false);
    return cancel;
  }, [schedule, cancel]);

  return {
    query,
    setQuery: (value) => { void schedule(value, false); },
    results, isLoading, error,
    searchImmediate: (value) => schedule(value, true),
    reset: () => { void schedule('', false); },
  };
}

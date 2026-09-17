import { useCallback, useEffect, useRef, useState } from 'react';
import { MOCK_SOURCES } from '../mockSources';
import {
  isDisplayMode,
  isObjectRecord,
  isSourceEntityType,
  isStatusColor,
  SourceEntityProps,
  SourceEntityType,
} from '../types';

export interface UseSourceSearchOptions {
  entityType: SourceEntityType;
  apiBaseUrl?: string;
  debounceMs?: number;
  enableFallback?: boolean;
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

function isSearchResultPayload(value: unknown): value is { results: unknown[] } {
  return isObjectRecord(value) && 'results' in value && Array.isArray(value.results);
}

/**
 * React hook for searching sovereign sources with debouncing, AbortController cancellation,
 * and offline/mock fallback.
 * Strictly typed with 0 any and 0 type assertions.
 */
export function useSourceSearch({
  entityType,
  apiBaseUrl = '/api/v1.0/sources',
  debounceMs = 250,
  enableFallback = true,
}: UseSourceSearchOptions): UseSourceSearchResult {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SourceEntityProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const executeSearch = useCallback(
    async (searchQuery: string) => {
      const trimmed = searchQuery.trim();
      if (!trimmed) {
        setResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsLoading(true);
      setError(null);

      try {
        const url = `${apiBaseUrl}/search/?type=${encodeURIComponent(entityType)}&q=${encodeURIComponent(trimmed)}&limit=10`;
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: unknown = await response.json();
        if (isSearchResultPayload(data)) {
          const validatedList: SourceEntityProps[] = [];

          for (const item of data.results) {
            if (
              isObjectRecord(item) &&
              typeof item.sourceId === 'string' &&
              typeof item.title === 'string'
            ) {
              const entityTypeVal = isSourceEntityType(item.entityType)
                ? item.entityType
                : entityType;
              const displayModeVal = isDisplayMode(item.displayMode)
                ? item.displayMode
                : 'callout';
              const statusColorVal = isStatusColor(item.statusColor)
                ? item.statusColor
                : undefined;

              validatedList.push({
                entityType: entityTypeVal,
                displayMode: displayModeVal,
                sourceId: item.sourceId,
                title: item.title,
                subtitle: typeof item.subtitle === 'string' ? item.subtitle : undefined,
                status: typeof item.status === 'string' ? item.status : undefined,
                statusColor: statusColorVal,
                meta1: typeof item.meta1 === 'string' ? item.meta1 : undefined,
                meta2: typeof item.meta2 === 'string' ? item.meta2 : undefined,
                meta3: typeof item.meta3 === 'string' ? item.meta3 : undefined,
                excerpt: typeof item.excerpt === 'string' ? item.excerpt : undefined,
                summary: typeof item.summary === 'string' ? item.summary : undefined,
                url: typeof item.url === 'string' ? item.url : undefined,
                verifiedAt: typeof item.verifiedAt === 'string' ? item.verifiedAt : undefined,
              });
            }
          }

          setResults(validatedList);
        } else {
          setResults([]);
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Ignored because request was aborted intentionally
          return;
        }

        if (enableFallback) {
          // Fallback to local mock data
          const fallbackData = (MOCK_SOURCES[entityType] || []).filter((item) => {
            const q = trimmed.toLowerCase();
            return (
              item.title.toLowerCase().includes(q) ||
              (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
              (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
              (item.summary && item.summary.toLowerCase().includes(q))
            );
          });
          setResults(fallbackData);
        } else {
          setError(err instanceof Error ? err.message : 'Unknown search error');
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, entityType, enableFallback],
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      void executeSearch(query);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, debounceMs, executeSearch]);

  const reset = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setQuery('');
    setResults([]);
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    searchImmediate: executeSearch,
    reset,
  };
}

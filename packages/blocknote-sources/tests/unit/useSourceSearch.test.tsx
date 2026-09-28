// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useSourceSearch } from "../../src/hooks/useSourceSearch";
import type { SourceSearchClient } from "../../src/searchClient";
import type { SourceEntityProps } from "../../src/types";

const record: SourceEntityProps = {
  entityType: "law",
  displayMode: "callout",
  sourceId: "remote-id",
  title: "Remote record",
};
const deferred = () => {
  let resolve: (value: SourceEntityProps[]) => void = () => {
    throw new Error("Not initialized");
  };
  let reject: (error: Error) => void = () => {
    throw new Error("Not initialized");
  };
  const promise = new Promise<SourceEntityProps[]>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
};

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("ignores an old response and its finally while a new search is pending", async () => {
  const first = deferred();
  const second = deferred();
  const client = vi
    .fn<SourceSearchClient>()
    .mockReturnValueOnce(first.promise)
    .mockReturnValueOnce(second.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: "law", client }));
  act(() => result.current.setQuery("old"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  act(() => result.current.setQuery("new"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(client.mock.calls[0]?.[0].signal.aborted).toBe(true);
  await act(async () => first.resolve([{ ...record, title: "Old" }]));
  expect(result.current.results).toEqual([]);
  expect(result.current.isLoading).toBe(true);
  await act(async () => second.resolve([record]));
  expect(result.current.results).toEqual([record]);
  expect(result.current.isLoading).toBe(false);
});

it("clearing or resetting cancels a request even when the client ignores abort", async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: "law", client }));
  act(() => result.current.setQuery("query"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  act(() => result.current.reset());
  await act(async () => pending.resolve([record]));
  expect(result.current.query).toBe("");
  expect(result.current.results).toEqual([]);
  expect(result.current.error).toBeNull();
  expect(result.current.isLoading).toBe(false);
});

it("immediate search cancels debounce, resolves after the request, and runs only once", async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: "law", client }));
  act(() => result.current.setQuery("scheduled"));
  let completion: Promise<void> | undefined;
  act(() => {
    completion = result.current.searchImmediate("now");
  });
  expect(client).toHaveBeenCalledTimes(1);
  await act(async () => {
    pending.resolve([record]);
    await completion;
  });
  await act(() => vi.advanceTimersByTimeAsync(1000));
  expect(client).toHaveBeenCalledTimes(1);
  expect(result.current.query).toBe("now");
  expect(result.current.results).toEqual([record]);
});

it("aborts on country changes and unmount without displaying a late error", async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result, rerender, unmount } = renderHook(
    ({ country }: { country: "fr" | "ca" }) =>
      useSourceSearch({ entityType: "law", country, client }),
    { initialProps: { country: "fr" } },
  );
  act(() => result.current.setQuery("test"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  rerender({ country: "ca" });
  expect(client.mock.calls[0]?.[0].signal.aborted).toBe(true);
  unmount();
  await act(async () => pending.reject(new Error("late failure")));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(client).toHaveBeenCalledTimes(1);
});

it("ignores late error from request A when request B has already resolved with success", async () => {
  const reqA = deferred();
  const reqB = deferred();
  const client = vi
    .fn<SourceSearchClient>()
    .mockReturnValueOnce(reqA.promise)
    .mockReturnValueOnce(reqB.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: "law", client }));

  act(() => result.current.setQuery("first"));
  await act(() => vi.advanceTimersByTimeAsync(250));

  act(() => result.current.setQuery("second"));
  await act(() => vi.advanceTimersByTimeAsync(250));

  // B resolves with success first
  await act(async () => reqB.resolve([record]));
  expect(result.current.results).toEqual([record]);
  expect(result.current.error).toBeNull();

  // A fails with an error late
  await act(async () => reqA.reject(new Error("Network error on request A")));
  expect(result.current.results).toEqual([record]);
  expect(result.current.error).toBeNull();
  expect(result.current.isLoading).toBe(false);
});

it('clearing query via setQuery("") cancels in-flight request and resets state', async () => {
  const pending = deferred();
  const client = vi.fn<SourceSearchClient>().mockReturnValue(pending.promise);
  const { result } = renderHook(() => useSourceSearch({ entityType: "law", client }));

  act(() => result.current.setQuery("search term"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(result.current.isLoading).toBe(true);

  act(() => result.current.setQuery(""));
  expect(result.current.query).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.results).toEqual([]);

  await act(async () => pending.resolve([record]));
  expect(result.current.results).toEqual([]);
});

it("aborts and resets when client or entityType changes while a search is pending", async () => {
  const pendingA = deferred();
  const clientA = vi.fn<SourceSearchClient>().mockReturnValue(pendingA.promise);
  const clientB = vi.fn<SourceSearchClient>().mockReturnValue(new Promise(() => {}));

  const { result, rerender } = renderHook(
    ({ entityType, client }) => useSourceSearch({ entityType, client }),
    { initialProps: { entityType: "law" as const, client: clientA } },
  );

  act(() => result.current.setQuery("query"));
  await act(() => vi.advanceTimersByTimeAsync(250));
  expect(clientA).toHaveBeenCalledTimes(1);

  rerender({ entityType: "company" as const, client: clientB });
  expect(clientA.mock.calls[0]?.[0].signal.aborted).toBe(true);
});

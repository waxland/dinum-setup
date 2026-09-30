import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { OfflineCacheStrategy } from "../src/OfflineCacheStrategy";

describe("OfflineCacheStrategy", () => {
  let _navigatorSpy: unknown;

  beforeEach(() => {
    // vi.stubGlobal("navigator", { onLine: true }); // Using vi.stubGlobal instead
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shouldForceLocalIndex should return false when online", () => {
    vi.stubGlobal("navigator", { onLine: true });
    expect(OfflineCacheStrategy.shouldForceLocalIndex()).toBe(false);
  });

  it("shouldForceLocalIndex should return true when offline", () => {
    vi.stubGlobal("navigator", { onLine: false });
    expect(OfflineCacheStrategy.shouldForceLocalIndex()).toBe(true);
  });

  it("executeWithFallback should return fetchTask when online and successful", async () => {
    vi.stubGlobal("navigator", { onLine: true });
    const fetchTask = vi.fn().mockResolvedValue("fetch");
    const fallbackTask = vi.fn().mockResolvedValue("fallback");

    const result = await OfflineCacheStrategy.executeWithFallback(fetchTask, fallbackTask);

    expect(result).toBe("fetch");
    expect(fetchTask).toHaveBeenCalled();
    expect(fallbackTask).not.toHaveBeenCalled();
  });

  it("executeWithFallback should return fallbackTask when offline", async () => {
    vi.stubGlobal("navigator", { onLine: false });
    const fetchTask = vi.fn().mockResolvedValue("fetch");
    const fallbackTask = vi.fn().mockResolvedValue("fallback");

    const result = await OfflineCacheStrategy.executeWithFallback(fetchTask, fallbackTask);

    expect(result).toBe("fallback");
    expect(fetchTask).not.toHaveBeenCalled();
    expect(fallbackTask).toHaveBeenCalled();
  });

  it("executeWithFallback should return fallbackTask when fetchTask fails", async () => {
    vi.stubGlobal("navigator", { onLine: true });
    const fetchTask = vi.fn().mockRejectedValue(new Error("Network error"));
    const fallbackTask = vi.fn().mockResolvedValue("fallback");

    const result = await OfflineCacheStrategy.executeWithFallback(fetchTask, fallbackTask);

    expect(result).toBe("fallback");
    expect(fetchTask).toHaveBeenCalled();
    expect(fallbackTask).toHaveBeenCalled();
  });
});

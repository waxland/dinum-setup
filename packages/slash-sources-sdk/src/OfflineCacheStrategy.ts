export class OfflineCacheStrategy {
  private static isOffline(): boolean {
    return typeof navigator !== "undefined" && navigator.onLine === false;
  }

  /**
   * Returns true if the environment is offline and local indexes should be forced.
   */
  public static shouldForceLocalIndex(): boolean {
    return this.isOffline();
  }

  /**
   * Helper to fallback to a local pre-loaded payload if the primary fetch fails
   * or if we are already offline.
   */
  public static async executeWithFallback<T>(
    fetchTask: () => Promise<T>,
    fallbackTask: () => Promise<T>,
  ): Promise<T> {
    if (this.shouldForceLocalIndex()) {
      return fallbackTask();
    }

    try {
      return await fetchTask();
    } catch (_error) {
      // If the fetch task fails (e.g. timeout, network error), we fallback to local cache
      return fallbackTask();
    }
  }
}

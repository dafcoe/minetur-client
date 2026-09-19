import { MineTurHttpClient } from '../http-client';
import { mapMineTurRegionsToRegions } from './client.mapper';
import { FetchOptions, Region } from './client.type';

export class MineTurClient {
  private regionsPromise: Promise<Region[]> | null = null;

  constructor(
    private readonly httpClient: MineTurHttpClient = new MineTurHttpClient(),
  ) {}

  /**
   * Generic fetch error logger.
   */
  private logFetchError(resource: string, error: unknown): void {
    const verboseError = error instanceof Error ? error.message : String(error);

    console.error(`Failed to fetch ${resource} (${verboseError})`);
  }

  /**
   * Generic helper to fetch reference data with promise memoization and error-handling.
   */
  private fetchAndCache<T, R>(
    resource: string,
    currentPromise: Promise<T[]> | null,
    setPromise: (promise: Promise<T[]> | null) => void,
    fetchFn: () => Promise<R[]>,
    mapFn: (data: R[]) => T[],
    options?: FetchOptions,
  ): Promise<T[]> {
    if (currentPromise && !options?.forceRefresh) return currentPromise;

    const promise = (async () => {
      try {
        const response = await fetchFn();

        if (!response) {
          setPromise(null);
          return [];
        }

        return mapFn(response);
      } catch (error) {
        setPromise(null);
        this.logFetchError(resource, error);

        return [];
      }
    })();

    setPromise(promise);
    return promise;
  }

  /**
   * Fetches the complete list of available regions.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getRegions(options?: FetchOptions): Promise<Region[]> {
    return this.fetchAndCache(
      'regions',
      this.regionsPromise,
      (promise) => { this.regionsPromise = promise; },
      () => this.httpClient.getRegions(),
      mapMineTurRegionsToRegions,
      options,
    );
  }
}

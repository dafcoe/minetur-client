import { MineTurHttpClient } from '../http-client';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurMunicipalitiesToMunicipalities,
  mapMineTurRegionsToRegions,
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
} from './client.mapper';
import {
  District,
  DistrictFilters,
  FetchOptions,
  Municipality,
  MunicipalityFilters,
  Region,
} from './client.type';

export class MineTurClient {
  private regionsPromise: Promise<Region[]> | null = null;
  private districtsPromises = new Map<string | 'ALL', Promise<District[]>>();
  private municipalitiesPromises = new Map<string | 'ALL', Promise<Municipality[]>>();

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

  /**
   * Fetches districts, optionally filtered by region ID.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getDistricts(
    filters: DistrictFilters = {},
    options?: FetchOptions,
  ): Promise<District[]> {
    const cacheKey = filters.regionId ?? 'ALL';
    const currentPromise = this.districtsPromises.get(cacheKey) ?? null;

    return this.fetchAndCache(
      'districts',
      currentPromise,
      (promise) => {
        if (promise) this.districtsPromises.set(cacheKey, promise);
        else this.districtsPromises.delete(cacheKey);
      },
      () => {
        const mineTurFilters = mapDistrictFiltersToMineTurDistrictFilters(filters);
        return this.httpClient.getDistricts(mineTurFilters);
      },
      mapMineTurDistrictsToDistricts,
      options,
    );
  }

  /**
   * Fetches municipalities, optionally filtered by district ID.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getMunicipalities(
    filters: MunicipalityFilters = {},
    options?: FetchOptions,
  ): Promise<Municipality[]> {
    const cacheKey = filters.districtId ?? 'ALL';
    const currentPromise = this.municipalitiesPromises.get(cacheKey) ?? null;

    return this.fetchAndCache(
      'municipalities',
      currentPromise,
      (promise) => {
        if (promise) this.municipalitiesPromises.set(cacheKey, promise);
        else this.municipalitiesPromises.delete(cacheKey);
      },
      () => {
        const mineTurFilters = mapMunicipalityFiltersToMineTurMunicipalityFilters(filters);
        return this.httpClient.getMunicipalities(mineTurFilters);
      },
      mapMineTurMunicipalitiesToMunicipalities,
      options,
    );
  }
}

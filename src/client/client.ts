import { MineTurHttpClient } from '../http-client';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurFuelsToFuels,
  mapMineTurMunicipalitiesToMunicipalities,
  mapMineTurRegionsToRegions,
  mapMineTurStationsToStations,
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
  mapStationFiltersToMineTurStationFilters,
} from './client.mapper';
import {
  CacheResource,
  District,
  DistrictFilters,
  FetchOptions,
  Fuel,
  Municipality,
  MunicipalityFilters,
  Region,
  Station,
  StationFilters,
} from './client.type';

export class MineTurClient {
  private regionsPromise: Promise<Region[]> | null = null;
  private districtsPromises = new Map<string | 'ALL', Promise<District[]>>();
  private municipalitiesPromises = new Map<string | 'ALL', Promise<Municipality[]>>();
  private fuelsPromise: Promise<Fuel[]> | null = null;

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

  /**
   * Fetches the complete list of available fuels.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getFuels(options?: FetchOptions): Promise<Fuel[]> {
    return this.fetchAndCache(
      'fuels',
      this.fuelsPromise,
      (promise) => { this.fuelsPromise = promise; },
      () => this.httpClient.getFuels(),
      mapMineTurFuelsToFuels,
      options,
    );
  }

  /**
   * Fetches stations and their fuel prices using optional filters.
   */
  async getStations(filters: StationFilters = {}): Promise<Station[]> {
    try {
      const mineTurFilters = mapStationFiltersToMineTurStationFilters(filters);

      const [response, fuels] = await Promise.all([
        this.httpClient.getStations(mineTurFilters),
        this.getFuels(),
      ]);

      if (!response?.ListaEESSPrecio) return [];

      return mapMineTurStationsToStations(response, fuels);
    } catch (error) {
      this.logFetchError('stations', error);

      return [];
    }
  }

  /**
   * Clears in-memory cached data.
   * Can clear all caches or a specific resource cache.
   */
  clearCache(resource?: CacheResource): void {
    if (!resource || resource === 'regions') this.regionsPromise = null;
    if (!resource || resource === 'districts') this.districtsPromises.clear();
    if (!resource || resource === 'municipalities') this.municipalitiesPromises.clear();
    if (!resource || resource === 'fuels') this.fuelsPromise = null;
  }
}

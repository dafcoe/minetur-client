import {
  DISTRICTS_BY_REGION_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_BY_DISTRICT_URL,
  MUNICIPALITIES_URL,
  REGIONS_URL,
  STATIONS_BY_DISTRICT,
  STATIONS_BY_DISTRICT_AND_FUEL,
  STATIONS_BY_FUEL,
  STATIONS_BY_MUNICIPALITY,
  STATIONS_BY_MUNICIPALITY_AND_FUEL,
  STATIONS_BY_REGION_AND_FUEL_URL,
  STATIONS_BY_REGION_URL,
  STATIONS_URL,
} from './http-client.constant';
import {
  MineTurDistrict,
  MineTurDistrictFilters,
  MineTurFuel,
  MineTurMunicipality,
  MineTurMunicipalityFilters,
  MineTurRegion,
  MineTurStations,
  MineTurStationsFilters,
} from './http-client.type';

export class MineTurHttpClient {
  private headers = {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  /**
   * Generic HTTP fetch wrapper handling headers, status validation, and JSON parsing.
   */
  private async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return (await response.json()) as T;
  }

  /**
   * Fetches raw regions from MineTur.
   */
  async getRegions(): Promise<MineTurRegion[]> {
    return this.fetch<MineTurRegion[]>(REGIONS_URL);
  }

  /**
   * Fetches raw districts from MineTur.
   * When filters.IDCCAA is provided, returns only districts belonging to that region.
   */
  async getDistricts(filters: MineTurDistrictFilters = {}): Promise<MineTurDistrict[]> {
    const districtsUrl = filters.IDCCAA
      ? `${DISTRICTS_BY_REGION_URL}/${filters.IDCCAA}`
      : DISTRICTS_URL;

    return this.fetch<MineTurDistrict[]>(districtsUrl);
  }

  /**
   * Fetches raw municipalities from MineTur.
   * When filters.IDPovincia is provided, returns only municipalities belonging to that district.
   */
  async getMunicipalities(filters: MineTurMunicipalityFilters = {}): Promise<MineTurMunicipality[]> {
    const municipalitiesUrl = filters.IDPovincia
      ? `${MUNICIPALITIES_BY_DISTRICT_URL}/${filters.IDPovincia}`
      : MUNICIPALITIES_URL;

    return this.fetch<MineTurMunicipality[]>(municipalitiesUrl);
  }

  /**
   * Fetches raw fuels from MineTur.
   */
  async getFuels(): Promise<MineTurFuel[]> {
    return this.fetch<MineTurFuel[]>(FUELS_URL);
  }

  /**
   * Fetches raw stations with fuel prices from MineTur.
   */
  async getStations(filters: MineTurStationsFilters = {}): Promise<MineTurStations> {
    const stationsUrl = this.resolveStationsUrl(filters);

    return this.fetch<MineTurStations>(stationsUrl);
  }

  private resolveStationsUrl(filters: MineTurStationsFilters): string {
    const idCCAA = filters.IDCCAA;
    const idProvincia = filters.IDProvincia;
    const idMunicipio = filters.IDMunicipio;
    const idProducto = filters.IDProducto;

    const hasCCAA = Boolean(idCCAA);
    const hasProvincia = Boolean(idProvincia);
    const hasMunicipio = Boolean(idMunicipio);
    const hasProducto = Boolean(idProducto);

    if (hasCCAA && !hasProvincia && !hasMunicipio && !hasProducto) {
      return `${STATIONS_BY_REGION_URL}/${idCCAA}`;
    }

    if (hasCCAA && !hasProvincia && !hasMunicipio && hasProducto) {
      return `${STATIONS_BY_REGION_AND_FUEL_URL}/${idCCAA}/${idProducto}`;
    }

    if (!hasCCAA && hasProvincia && !hasMunicipio && !hasProducto) {
      return `${STATIONS_BY_DISTRICT}/${idProvincia}`;
    }

    if (!hasCCAA && hasProvincia && !hasMunicipio && hasProducto) {
      return `${STATIONS_BY_DISTRICT_AND_FUEL}/${idProvincia}/${idProducto}`;
    }

    if (!hasCCAA && !hasProvincia && hasMunicipio && !hasProducto) {
      return `${STATIONS_BY_MUNICIPALITY}/${idMunicipio}`;
    }

    if (!hasCCAA && !hasProvincia && hasMunicipio && hasProducto) {
      return `${STATIONS_BY_MUNICIPALITY_AND_FUEL}/${idMunicipio}/${idProducto}`;
    }

    if (!hasCCAA && !hasProvincia && !hasMunicipio && hasProducto) {
      return `${STATIONS_BY_FUEL}/${idProducto}`;
    }

    return STATIONS_URL;
  }
}

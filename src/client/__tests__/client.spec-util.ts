import { Mocked } from 'vitest';
import { MineTurHttpClient } from '../../http-client';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurFuelsToFuels,
  mapMineTurMunicipalitiesToMunicipalities,
  mapMineTurRegionsToRegions,
  mapMineTurStationsToStations,
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
  mapStationFiltersToMineTurStationFilters,
} from '../client.mapper';
import {
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  regionsFixture,
  stationsFixture,
} from './client.fixture';

export function createError(message = 'Network error'): Error {
  return new Error(message);
}

export function createHttpClientMock() {
  return {
    getRegions: vi.fn(),
    getDistricts: vi.fn(),
    getMunicipalities: vi.fn(),
    getFuels: vi.fn(),
    getStations: vi.fn(),
  } as unknown as Mocked<MineTurHttpClient>;
}

export function mockMappers() {
  vi.mocked(mapMineTurRegionsToRegions).mockReturnValue(regionsFixture);
  vi.mocked(mapMineTurDistrictsToDistricts).mockReturnValue(districtsFixture);
  vi.mocked(mapDistrictFiltersToMineTurDistrictFilters).mockReturnValue({});
  vi.mocked(mapMineTurMunicipalitiesToMunicipalities).mockReturnValue(municipalitiesFixture);
  vi.mocked(mapMunicipalityFiltersToMineTurMunicipalityFilters).mockReturnValue({});
  vi.mocked(mapMineTurFuelsToFuels).mockReturnValue(fuelsFixture);
  vi.mocked(mapMineTurStationsToStations).mockReturnValue(stationsFixture);
  vi.mocked(mapStationFiltersToMineTurStationFilters).mockReturnValue({});
}

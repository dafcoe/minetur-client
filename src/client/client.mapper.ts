import {
  MineTurDistrict,
  MineTurDistrictFilters,
  MineTurRegion,
} from '../http-client';
import {
  District,
  DistrictFilters,
  Region,
} from './client.type';

export function mapMineTurRegionToRegion(mineTurRegion: MineTurRegion): Region {
  return {
    id: mineTurRegion.IDCCAA,
    name: mineTurRegion.CCAA,
  };
}

export function mapMineTurRegionsToRegions(mineTurRegions: MineTurRegion[]): Region[] {
  return mineTurRegions.map(mapMineTurRegionToRegion);
}

export function mapMineTurDistrictToDistrict(mineTurDistrict: MineTurDistrict): District {
  return {
    id: mineTurDistrict.IDPovincia,
    idRegion: mineTurDistrict.IDCCAA,
    name: mineTurDistrict.Provincia,
  };
}

export function mapMineTurDistrictsToDistricts(mineTurDistricts: MineTurDistrict[]): District[] {
  return mineTurDistricts.map(mapMineTurDistrictToDistrict);
}

export function mapDistrictFiltersToMineTurDistrictFilters(
  districtFilters: DistrictFilters,
): MineTurDistrictFilters {
  const filters: MineTurDistrictFilters = {};

  if (districtFilters.regionId) filters.IDCCAA = districtFilters.regionId;

  return filters;
}

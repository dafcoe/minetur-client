import {
  MineTurDistrict,
  MineTurDistrictFilters,
  MineTurFuel,
  MineTurMunicipality,
  MineTurMunicipalityFilters,
  MineTurRegion,
} from '../http-client';
import {
  District,
  DistrictFilters,
  Fuel,
  Municipality,
  MunicipalityFilters,
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

export function mapMineTurMunicipalityToMunicipality(
  mineTurMunicipality: MineTurMunicipality,
): Municipality {
  return {
    id: mineTurMunicipality.IDMunicipio,
    idDistrict: mineTurMunicipality.IDPovincia,
    idRegion: mineTurMunicipality.IDCCAA,
    name: mineTurMunicipality.Municipio,
  };
}

export function mapMineTurMunicipalitiesToMunicipalities(
  mineTurMunicipalities: MineTurMunicipality[],
): Municipality[] {
  return mineTurMunicipalities.map(mapMineTurMunicipalityToMunicipality);
}

export function mapMunicipalityFiltersToMineTurMunicipalityFilters(
  municipalityFilters: MunicipalityFilters,
): MineTurMunicipalityFilters {
  const filters: MineTurMunicipalityFilters = {};

  if (municipalityFilters.districtId) filters.IDPovincia = municipalityFilters.districtId;

  return filters;
}

export function mapMineTurFuelToFuel(mineTurFuel: MineTurFuel): Fuel {
  return {
    id: mineTurFuel.IDProducto,
    name: mineTurFuel.NombreProducto,
    abbreviation: mineTurFuel.NombreProductoAbreviatura,
  };
}

export function mapMineTurFuelsToFuels(mineTurFuels: MineTurFuel[]): Fuel[] {
  return mineTurFuels.map(mapMineTurFuelToFuel);
}

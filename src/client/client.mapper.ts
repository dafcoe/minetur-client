import {
  MineTurDistrict,
  MineTurDistrictFilters,
  MineTurFuel,
  MineTurMunicipality,
  MineTurMunicipalityFilters,
  MineTurRegion,
  MineTurStation,
  MineTurStations,
  MineTurStationsFilters,
} from '../http-client';
import { STATION_PRICE_KEY_TO_FUEL_ID } from './client.constant';
import {
  District,
  DistrictFilters,
  Fuel,
  Municipality,
  MunicipalityFilters,
  Region,
  Station,
  StationFilters,
  StationFuel,
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

export function parseCoordinate(coordinate: string): number {
  if (!coordinate) return 0;

  const parsedCoordinate = parseFloat(coordinate.replace(',', '.'));

  return Number.isNaN(parsedCoordinate) ? 0 : parsedCoordinate;
}

export function parseDateStringToTimestamp(dateString: string): number {
  if (!dateString) return 0;

  const [datePart, timePart] = dateString.trim().split(' ');
  const [day, month, year] = datePart.split('/').map(Number);

  if (!day || !month || !year) {
    const parsedDateString = Date.parse(dateString);

    return Number.isNaN(parsedDateString) ? 0 : parsedDateString;
  }

  const [hours = 0, minutes = 0, seconds = 0] = (timePart ?? '').split(':').map(Number);
  const timestamp = new Date(year, month - 1, day, hours, minutes, seconds).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function mapMineTurStationToStation(
  mineTurStation: MineTurStation,
  fuels: Fuel[] | Map<string, Fuel> = [],
  dateStringOrTimestamp: string | number = '',
): Station {
  const updatedAt = typeof dateStringOrTimestamp === 'number'
    ? dateStringOrTimestamp
    : parseDateStringToTimestamp(dateStringOrTimestamp);

  const fuelsMap = fuels instanceof Map
    ? fuels
    : new Map<string, Fuel>(fuels.map((fuel) => [fuel.id, fuel]));

  const stationFuels: StationFuel[] = [];

  for (const [priceKey, fuelId] of Object.entries(STATION_PRICE_KEY_TO_FUEL_ID)) {
    const price = mineTurStation[priceKey as keyof MineTurStation];

    if (price && typeof price === 'string' && price.trim() !== '') {
      const fuel = fuelsMap.get(fuelId);

      if (fuel) {
        stationFuels.push({
          id: fuel.id,
          name: fuel.name,
          abbreviation: fuel.abbreviation,
          price,
          updatedAt,
        });
      }
    }
  }

  return {
    id: mineTurStation.IDEESS,
    brand: mineTurStation.Rótulo,
    address: mineTurStation.Dirección,
    town: mineTurStation.Localidad,
    postalCode: mineTurStation['C.P.'],
    latitude: parseCoordinate(mineTurStation.Latitud),
    longitude: parseCoordinate(mineTurStation['Longitud (WGS84)']),
    schedule: mineTurStation.Horario,
    margin: mineTurStation.Margen,
    municipality: mineTurStation.Municipio,
    idMunicipality: mineTurStation.IDMunicipio,
    district: mineTurStation.Provincia,
    idDistrict: mineTurStation.IDProvincia,
    idRegion: mineTurStation.IDCCAA,
    saleType: mineTurStation['Tipo Venta'],
    remission: mineTurStation.Remisión,
    bioEthanolPercentage: mineTurStation['% BioEtanol'],
    methylEsterPercentage: mineTurStation['% Éster metílico'],
    fuels: stationFuels,
  };
}

export function mapMineTurStationsToStations(
  response: MineTurStations,
  fuels: Fuel[] = [],
): Station[] {
  if (!response?.ListaEESSPrecio) return [];

  const updatedAt = parseDateStringToTimestamp(response.Fecha);
  const fuelsMap = new Map<string, Fuel>(fuels.map((fuel) => [fuel.id, fuel]));

  return response.ListaEESSPrecio.map((station) =>
    mapMineTurStationToStation(station, fuelsMap, updatedAt),
  );
}

export function mapStationFiltersToMineTurStationFilters(
  stationFilters: StationFilters,
): MineTurStationsFilters {
  const filters: MineTurStationsFilters = {};

  if (stationFilters.regionId) filters.IDCCAA = stationFilters.regionId;
  if (stationFilters.districtId) filters.IDProvincia = stationFilters.districtId;
  if (stationFilters.municipalityId) filters.IDMunicipio = stationFilters.municipalityId;
  if (stationFilters.fuelId) filters.IDProducto = stationFilters.fuelId;

  return filters;
}

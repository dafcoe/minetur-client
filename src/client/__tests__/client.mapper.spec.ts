import { MineTurStations } from '../../http-client';
import {
  mineTurDistrictMadridFixture,
  mineTurDistrictsFixture,
  mineTurFuelGasolinaFixture,
  mineTurFuelsFixture,
  mineTurMunicipalitiesFixture,
  mineTurMunicipalityMadridFixture,
  mineTurRegionAndaluciaFixture,
  mineTurRegionsFixture,
  mineTurStationAFixture,
  mineTurStationsResponseFixture,
} from '../../http-client/__tests__/http-client.fixture';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurDistrictToDistrict,
  mapMineTurFuelsToFuels,
  mapMineTurFuelToFuel,
  mapMineTurMunicipalitiesToMunicipalities,
  mapMineTurMunicipalityToMunicipality,
  mapMineTurRegionsToRegions,
  mapMineTurRegionToRegion,
  mapMineTurStationsToStations,
  mapMineTurStationToStation,
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
  mapStationFiltersToMineTurStationFilters,
  parseCoordinate,
  parseDateStringToTimestamp,
} from '../client.mapper';
import {
  districtMadridFixture,
  districtsFixture,
  fuelGasolinaFixture,
  fuelsFixture,
  municipalitiesFixture,
  municipalityMadridFixture,
  regionAndaluciaFixture,
  regionsFixture,
  stationAFixture,
  stationsFixture,
} from './client.fixture';

describe('client.mapper', () => {
  describe('regions', () => {
    it('should correctly map a single MineTurRegion to Region', () => {
      // Act
      const region = mapMineTurRegionToRegion(mineTurRegionAndaluciaFixture);

      // Assert
      expect(region).toEqual(regionAndaluciaFixture);
    });

    it('should correctly map an array of MineTurRegions to Regions', () => {
      // Act
      const regions = mapMineTurRegionsToRegions(mineTurRegionsFixture);

      // Assert
      expect(regions).toEqual(regionsFixture);
    });

    it('should return an empty array when mapping an empty array of regions', () => {
      // Act
      const regions = mapMineTurRegionsToRegions([]);

      // Assert
      expect(regions).toEqual([]);
    });
  });

  describe('districts', () => {
    it('should correctly map a single MineTurDistrict to District', () => {
      // Act
      const district = mapMineTurDistrictToDistrict(mineTurDistrictMadridFixture);

      // Assert
      expect(district).toEqual(districtMadridFixture);
    });

    it('should correctly map an array of MineTurDistricts to Districts', () => {
      // Act
      const districts = mapMineTurDistrictsToDistricts(mineTurDistrictsFixture);

      // Assert
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array when mapping an empty array of districts', () => {
      // Act
      const districts = mapMineTurDistrictsToDistricts([]);

      // Assert
      expect(districts).toEqual([]);
    });
  });

  describe('municipalities', () => {
    it('should correctly map a single MineTurMunicipality to Municipality', () => {
      // Act
      const municipality = mapMineTurMunicipalityToMunicipality(mineTurMunicipalityMadridFixture);

      // Assert
      expect(municipality).toEqual(municipalityMadridFixture);
    });

    it('should correctly map an array of MineTurMunicipalities to Municipalities', () => {
      // Act
      const municipalities = mapMineTurMunicipalitiesToMunicipalities(mineTurMunicipalitiesFixture);

      // Assert
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array when mapping an empty array of municipalities', () => {
      // Act
      const municipalities = mapMineTurMunicipalitiesToMunicipalities([]);

      // Assert
      expect(municipalities).toEqual([]);
    });
  });

  describe('fuels', () => {
    it('should correctly map a single MineTurFuel to Fuel', () => {
      // Act
      const fuel = mapMineTurFuelToFuel(mineTurFuelGasolinaFixture);

      // Assert
      expect(fuel).toEqual(fuelGasolinaFixture);
    });

    it('should correctly map an array of MineTurFuels to Fuels', () => {
      // Act
      const fuels = mapMineTurFuelsToFuels(mineTurFuelsFixture);

      // Assert
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array when mapping an empty array of fuels', () => {
      // Act
      const fuels = mapMineTurFuelsToFuels([]);

      // Assert
      expect(fuels).toEqual([]);
    });
  });

  describe('stations', () => {
    describe('parseCoordinate', () => {
      it('should parse coordinate with comma decimal separator', () => {
        // Assemble
        const coordinateA = '40,416775';
        const coordinateB = '-3,703790';
        const expectedCoordinateA = 40.416775;
        const expectedCoordinateB = -3.703790;

        // Act
        const parsedCoordinateA = parseCoordinate(coordinateA);
        const parsedCoordinateB = parseCoordinate(coordinateB);

        // Assert
        expect(parsedCoordinateA).toBe(expectedCoordinateA);
        expect(parsedCoordinateB).toBe(expectedCoordinateB);
      });

      it('should return 0 when coordinate is empty or invalid', () => {
        // Assemble
        const coordinateA = '';
        const coordinateB = 'invalid';
        const expectedCoordinateA = 0;
        const expectedCoordinateB = 0;

        // Act
        const parsedCoordinateA = parseCoordinate(coordinateA);
        const parsedCoordinateB = parseCoordinate(coordinateB);

        // Assert
        expect(parsedCoordinateA).toBe(expectedCoordinateA);
        expect(parsedCoordinateB).toBe(expectedCoordinateB);
      });
    });

    describe('parseDateStringToTimestamp', () => {
      it('should parse valid DD/MM/YYYY HH:mm:ss string to timestamp', () => {
        // Assemble
        const dateString = '13/09/2026 22:00:00';
        const expectedTimestamp = new Date(2026, 8, 13, 22, 0, 0).getTime();

        // Act
        const timestamp = parseDateStringToTimestamp(dateString);

        // Assert
        expect(timestamp).toBe(expectedTimestamp);
      });

      it('should parse date string without time part to timestamp', () => {
        // Assemble
        const dateString = '13/09/2026';
        const expectedTimestamp = new Date(2026, 8, 13, 0, 0, 0).getTime();

        // Act
        const timestamp = parseDateStringToTimestamp(dateString);

        // Assert
        expect(timestamp).toBe(expectedTimestamp);
      });

      it('should parse ISO date string to timestamp as fallback', () => {
        // Assemble
        const dateString = '2026-09-13T22:00:00Z';
        const expectedTimestamp = Date.parse(dateString);

        // Act
        const timestamp = parseDateStringToTimestamp(dateString);

        // Assert
        expect(timestamp).toBe(expectedTimestamp);
      });

      it('should return 0 for empty or invalid date string', () => {
        // Assemble
        const dateStringA = '';
        const dateStringB = 'invalid';
        const expectedTimestampA = 0;
        const expectedTimestampB = 0;

        // Act
        const timestampA = parseDateStringToTimestamp(dateStringA);
        const timestampB = parseDateStringToTimestamp(dateStringB);

        // Assert
        expect(timestampA).toBe(expectedTimestampA);
        expect(timestampB).toBe(expectedTimestampB);
      });
    });

    it('should correctly map a single MineTurStation to Station', () => {
      // Act
      const station = mapMineTurStationToStation(
        mineTurStationAFixture,
        fuelsFixture,
        mineTurStationsResponseFixture.Fecha,
      );

      // Assert
      expect(station).toEqual(stationAFixture);
    });

    it('should correctly map a single MineTurStation to Station (passing fuels as a Map and dateString as a timestamp)', () => {
      // Assemble
      const fuelsMap = new Map(fuelsFixture.map((fuel) => [fuel.id, fuel]));
      const timestamp = new Date(2026, 8, 13, 22, 0, 0).getTime();

      // Act
      const station = mapMineTurStationToStation(
        mineTurStationAFixture,
        fuelsMap,
        timestamp,
      );

      // Assert
      expect(station).toEqual(stationAFixture);
    });

    it('should correctly map a single MineTurStation to Station ignoring fuels with empty prices and fuels missing in fuelsMap', () => {
      // Act
      const station = mapMineTurStationToStation(
        mineTurStationAFixture,
        [],
        mineTurStationsResponseFixture.Fecha,
      );

      // Assert
      expect(station.fuels).toEqual([]);
    });

    it('should correctly map and array of MineTurStations to Stations', () => {
      // Act
      const stations = mapMineTurStationsToStations(
        mineTurStationsResponseFixture,
        fuelsFixture,
      );

      // Assert
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an empty array when response has no ListaEESSPrecio', () => {
      // Act
      const stations = mapMineTurStationsToStations({} as MineTurStations, fuelsFixture);

      // Assert
      expect(stations).toEqual([]);
    });

    it('should return an empty array when ListaEESSPrecio is empty', () => {
      // Act
      const stations = mapMineTurStationsToStations(
        { Fecha: '13/09/2026 22:00:00', ListaEESSPrecio: [] },
        fuelsFixture,
      );

      // Assert
      expect(stations).toEqual([]);
    });
  });

  describe('filters', () => {
    describe('mapDistrictFiltersToMineTurDistrictFilters', () => {
      it('should map regionId when provided', () => {
        // Assemble
        const regionId = '13';
        const filters = { regionId };
        const expectedFilters = { IDCCAA: regionId };

        // Act
        const mineTurFilters = mapDistrictFiltersToMineTurDistrictFilters(filters);

        // Assert
        expect(mineTurFilters).toEqual(expectedFilters);
      });

      it('should return an empty object when regionId is not provided', () => {
        // Act
        const filters = mapDistrictFiltersToMineTurDistrictFilters({});

        // Assert
        expect(filters).toEqual({});
      });
    });

    describe('mapMunicipalityFiltersToMineTurMunicipalityFilters', () => {
      it('should map districtId when provided', () => {
        // Assemble
        const districtId = '28';
        const filters = { districtId };
        const expectedFilters = { IDPovincia: districtId };

        // Act
        const mineTurFilters = mapMunicipalityFiltersToMineTurMunicipalityFilters(filters);

        // Assert
        expect(mineTurFilters).toEqual(expectedFilters);
      });

      it('should return an empty object when districtId is not provided', () => {
        // Act
        const filters = mapMunicipalityFiltersToMineTurMunicipalityFilters({});

        // Assert
        expect(filters).toEqual({});
      });
    });

    describe('mapStationFiltersToMineTurStationFilters', () => {
      it('should map all filters when provided', () => {
        // Assemble
        const filters = {
          regionId: '13',
          districtId: '28',
          municipalityId: '4354',
          fuelId: '1',
        };
        const expectedFilters = {
          IDCCAA: '13',
          IDProvincia: '28',
          IDMunicipio: '4354',
          IDProducto: '1',
        };

        // Act
        const mineTurFilters = mapStationFiltersToMineTurStationFilters(filters);

        // Assert
        expect(mineTurFilters).toEqual(expectedFilters);
      });

      it('should return an empty object when no filters are provided', () => {
        // Act
        const filters = mapStationFiltersToMineTurStationFilters({});

        // Assert
        expect(filters).toEqual({});
      });
    });
  });
});

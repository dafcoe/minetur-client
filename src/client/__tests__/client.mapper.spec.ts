import {
  mineTurDistrictMadridFixture,
  mineTurDistrictsFixture,
  mineTurFuelGasolinaFixture,
  mineTurFuelsFixture,
  mineTurMunicipalitiesFixture,
  mineTurMunicipalityMadridFixture,
  mineTurRegionAndaluciaFixture,
  mineTurRegionsFixture,
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
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
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
  });
});

import {
  mineTurDistrictMadridFixture,
  mineTurDistrictsFixture,
  mineTurRegionAndaluciaFixture,
  mineTurRegionsFixture,
} from '../../http-client/__tests__/http-client.fixture';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurDistrictToDistrict,
  mapMineTurRegionsToRegions,
  mapMineTurRegionToRegion,
} from '../client.mapper';
import {
  districtMadridFixture,
  districtsFixture,
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
  });
});

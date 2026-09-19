import { mineTurRegionAndaluciaFixture, mineTurRegionsFixture } from '../../http-client/__tests__/http-client.fixture';
import { mapMineTurRegionsToRegions, mapMineTurRegionToRegion } from '../client.mapper';
import { regionAndaluciaFixture, regionsFixture } from './client.fixture';

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
});

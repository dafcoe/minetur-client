import { Mocked, MockInstance } from 'vitest';
import { MineTurHttpClient, MineTurRegion } from '../../http-client';
import { MineTurClient } from '../client';
import { mapMineTurRegionsToRegions } from '../client.mapper';
import { regionsFixture } from './client.fixture';
import {
  createError,
  createHttpClientMock,
  mockMappers,
} from './client.spec-util';

vi.mock('../client.mapper', () => ({
  mapMineTurRegionsToRegions: vi.fn(),
}));

describe('DGEGClient', () => {
  let httpClientMock: Mocked<MineTurHttpClient>;
  let client: MineTurClient;
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    httpClientMock = createHttpClientMock();
    client = new MineTurClient(httpClientMock);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockMappers();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getRegions', () => {
    it('should return an array of regions when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const mineTurRegions = [{ IDCCAA: '01', CCAA: 'Andalucia' }] as MineTurRegion[];
      httpClientMock.getRegions.mockResolvedValueOnce(mineTurRegions);

      // Act
      const regions = await client.getRegions();

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(1);
      expect(mapMineTurRegionsToRegions).toHaveBeenCalledWith(mineTurRegions);
      expect(regions).toEqual(regionsFixture);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getRegions.mockRejectedValueOnce(createError());

      // Act
      const regions = await client.getRegions();

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(1);
      expect(regions).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch regions (Network error)');
    });

    it('should cache regions and avoid subsequent network calls', async () => {
      // Assemble
      const mineTurRegions = [{ IDCCAA: '01', CCAA: 'Andalucia' }] as MineTurRegion[];
      httpClientMock.getRegions.mockResolvedValueOnce(mineTurRegions);

      // Act
      const firstCall = await client.getRegions();
      const secondCall = await client.getRegions();

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(regionsFixture);
      expect(secondCall).toEqual(regionsFixture);
    });

    it('should share the in-flight promise across concurrent calls', async () => {
      // Assemble
      const mineTurRegions = [{ IDCCAA: '01', CCAA: 'Andalucia' }] as MineTurRegion[];
      httpClientMock.getRegions.mockResolvedValueOnce(mineTurRegions);

      // Act
      const [firstCall, secondCall] = await Promise.all([
        client.getRegions(),
        client.getRegions(),
      ]);

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(regionsFixture);
      expect(secondCall).toEqual(regionsFixture);
    });

    it('should bypass cache when forceRefresh is true', async () => {
      // Assemble
      const mineTurRegions = [{ IDCCAA: '01', CCAA: 'Andalucia' }] as MineTurRegion[];
      httpClientMock.getRegions.mockResolvedValueOnce(mineTurRegions);

      // Act
      await client.getRegions();
      await client.getRegions({ forceRefresh: true });

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(2);
    });

    it('should not cache when the request fails, allowing subsequent retry', async () => {
      // Assemble
      const mineTurRegions = [{ IDCCAA: '01', CCAA: 'Andalucia' }] as MineTurRegion[];
      httpClientMock.getRegions
        .mockRejectedValueOnce(createError())
        .mockResolvedValueOnce(mineTurRegions);

      // Act
      const firstCall = await client.getRegions();
      const secondCall = await client.getRegions();

      // Assert
      expect(httpClientMock.getRegions).toHaveBeenCalledTimes(2);
      expect(firstCall).toEqual([]);
      expect(secondCall).toEqual(regionsFixture);
    });
  });
});

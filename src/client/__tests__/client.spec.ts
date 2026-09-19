import { Mocked, MockInstance } from 'vitest';
import {
  MineTurDistrict,
  MineTurFuel,
  MineTurHttpClient,
  MineTurMunicipality,
  MineTurRegion,
} from '../../http-client';
import { MineTurClient } from '../client';
import {
  mapDistrictFiltersToMineTurDistrictFilters,
  mapMineTurDistrictsToDistricts,
  mapMineTurFuelsToFuels,
  mapMineTurMunicipalitiesToMunicipalities,
  mapMineTurRegionsToRegions,
  mapMunicipalityFiltersToMineTurMunicipalityFilters,
} from '../client.mapper';
import { DistrictFilters, MunicipalityFilters } from '../client.type';
import {
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  regionsFixture,
} from './client.fixture';
import {
  createError,
  createHttpClientMock,
  mockMappers,
} from './client.spec-util';

vi.mock('../client.mapper', () => ({
  mapMineTurRegionsToRegions: vi.fn(),
  mapMineTurDistrictsToDistricts: vi.fn(),
  mapDistrictFiltersToMineTurDistrictFilters: vi.fn(),
  mapMineTurMunicipalitiesToMunicipalities: vi.fn(),
  mapMunicipalityFiltersToMineTurMunicipalityFilters: vi.fn(),
  mapMineTurFuelsToFuels: vi.fn(),
}));

describe('MineTurClient', () => {
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

  describe('getDistricts', () => {
    it('should return an array of districts when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts.mockResolvedValueOnce(mineTurDistricts);

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getDistricts).toHaveBeenCalledWith({});
      expect(mapMineTurDistrictsToDistricts).toHaveBeenCalledWith(mineTurDistricts);
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an array of districts when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      const filters: DistrictFilters = { regionId: '13' };
      const expectedMineTurFilters = { IDCCAA: '13' };
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];

      vi.mocked(mapDistrictFiltersToMineTurDistrictFilters).mockReturnValueOnce(expectedMineTurFilters);
      httpClientMock.getDistricts.mockResolvedValueOnce(mineTurDistricts);

      // Act
      const districts = await client.getDistricts(filters);

      // Assert
      expect(mapDistrictFiltersToMineTurDistrictFilters).toHaveBeenCalledWith(filters);
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getDistricts).toHaveBeenCalledWith(expectedMineTurFilters);
      expect(mapMineTurDistrictsToDistricts).toHaveBeenCalledWith(mineTurDistricts);
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getDistricts.mockRejectedValueOnce('Network error');

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(districts).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch districts (Network error)');
    });

    it('should cache districts and avoid subsequent network calls (without filters)', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts.mockResolvedValueOnce(mineTurDistricts);

      // Act
      const firstCall = await client.getDistricts();
      const secondCall = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(districtsFixture);
      expect(secondCall).toEqual(districtsFixture);
    });

    it('should cache districts separately for different region filters', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts.mockResolvedValue(mineTurDistricts);

      // Act
      await client.getDistricts({ regionId: '13' });
      await client.getDistricts({ regionId: '13' });
      await client.getDistricts({ regionId: '01' });

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(2);
    });

    it('should share the in-flight promise across concurrent calls', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts.mockResolvedValueOnce(mineTurDistricts);

      // Act
      const [firstCall, secondCall] = await Promise.all([
        client.getDistricts(),
        client.getDistricts(),
      ]);

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(districtsFixture);
      expect(secondCall).toEqual(districtsFixture);
    });

    it('should bypass cache when forceRefresh is true', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts.mockResolvedValue(mineTurDistricts);

      // Act
      await client.getDistricts();
      await client.getDistricts({}, { forceRefresh: true });

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(2);
    });

    it('should not cache when the request fails, allowing subsequent retry', async () => {
      // Assemble
      const mineTurDistricts = [{ IDPovincia: '28', Provincia: 'Madrid' }] as MineTurDistrict[];
      httpClientMock.getDistricts
        .mockRejectedValueOnce(createError())
        .mockResolvedValueOnce(mineTurDistricts);

      // Act
      const firstCall = await client.getDistricts();
      const secondCall = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(2);
      expect(firstCall).toEqual([]);
      expect(secondCall).toEqual(districtsFixture);
    });
  });

  describe('getMunicipalities', () => {
    it('should return an array of municipalities when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValueOnce(mineTurMunicipalities);

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledWith({});
      expect(mapMineTurMunicipalitiesToMunicipalities).toHaveBeenCalledWith(mineTurMunicipalities);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an array of municipalities when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      const filters: MunicipalityFilters = { districtId: '28' };
      const expectedMineTurFilters = { IDPovincia: '28' };
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];

      vi.mocked(mapMunicipalityFiltersToMineTurMunicipalityFilters).mockReturnValueOnce(expectedMineTurFilters);
      httpClientMock.getMunicipalities.mockResolvedValueOnce(mineTurMunicipalities);

      // Act
      const municipalities = await client.getMunicipalities(filters);

      // Assert
      expect(mapMunicipalityFiltersToMineTurMunicipalityFilters).toHaveBeenCalledWith(filters);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledWith(expectedMineTurFilters);
      expect(mapMineTurMunicipalitiesToMunicipalities).toHaveBeenCalledWith(mineTurMunicipalities);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getMunicipalities.mockRejectedValueOnce(createError());

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(municipalities).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch municipalities (Network error)');
    });

    it('should cache municipalities and avoid subsequent network calls (without filters)', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValueOnce(mineTurMunicipalities);

      // Act
      const firstCall = await client.getMunicipalities();
      const secondCall = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(municipalitiesFixture);
      expect(secondCall).toEqual(municipalitiesFixture);
    });

    it('should cache municipalities separately for different district filters', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValue(mineTurMunicipalities);

      // Act
      await client.getMunicipalities({ districtId: '28' });
      await client.getMunicipalities({ districtId: '28' });
      await client.getMunicipalities({ districtId: '41' });

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(2);
    });

    it('should share the in-flight promise across concurrent calls', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValueOnce(mineTurMunicipalities);

      // Act
      const [firstCall, secondCall] = await Promise.all([
        client.getMunicipalities(),
        client.getMunicipalities(),
      ]);

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(municipalitiesFixture);
      expect(secondCall).toEqual(municipalitiesFixture);
    });

    it('should bypass cache when forceRefresh is true', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValue(mineTurMunicipalities);

      // Act
      await client.getMunicipalities();
      await client.getMunicipalities({}, { forceRefresh: true });

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(2);
    });

    it('should not cache when the request fails, allowing subsequent retry', async () => {
      // Assemble
      const mineTurMunicipalities = [{ IDMunicipio: '4354', Municipio: 'Madrid' }] as MineTurMunicipality[];
      httpClientMock.getMunicipalities
        .mockRejectedValueOnce(createError())
        .mockResolvedValueOnce(mineTurMunicipalities);

      // Act
      const firstCall = await client.getMunicipalities();
      const secondCall = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(2);
      expect(firstCall).toEqual([]);
      expect(secondCall).toEqual(municipalitiesFixture);
    });
  });

  describe('getFuels', () => {
    it('should return an array of fuels when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const mineTurFuels = [{
        IDProducto: '1',
        NombreProducto: 'Gasolina 95 E5',
        NombreProductoAbreviatura: 'G95E5',
      }] as MineTurFuel[];
      httpClientMock.getFuels.mockResolvedValueOnce(mineTurFuels);

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(mapMineTurFuelsToFuels).toHaveBeenCalledWith(mineTurFuels);
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getFuels.mockRejectedValueOnce(createError());

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(fuels).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch fuels (Network error)');
    });

    it('should cache fuels and avoid subsequent network calls', async () => {
      // Assemble
      const mineTurFuels = [{
        IDProducto: '1',
        NombreProducto: 'Gasolina 95 E5',
        NombreProductoAbreviatura: 'G95E5',
      }] as MineTurFuel[];
      httpClientMock.getFuels.mockResolvedValueOnce(mineTurFuels);

      // Act
      const firstCall = await client.getFuels();
      const secondCall = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(fuelsFixture);
      expect(secondCall).toEqual(fuelsFixture);
    });

    it('should share the in-flight promise across concurrent calls', async () => {
      // Assemble
      const mineTurFuels = [{
        IDProducto: '1',
        NombreProducto: 'Gasolina 95 E5',
        NombreProductoAbreviatura: 'G95E5',
      }] as MineTurFuel[];
      httpClientMock.getFuels.mockResolvedValueOnce(mineTurFuels);

      // Act
      const [firstCall, secondCall] = await Promise.all([
        client.getFuels(),
        client.getFuels(),
      ]);

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(firstCall).toEqual(fuelsFixture);
      expect(secondCall).toEqual(fuelsFixture);
    });

    it('should bypass cache when forceRefresh is true', async () => {
      // Assemble
      const mineTurFuels = [{
        IDProducto: '1',
        NombreProducto: 'Gasolina 95 E5',
        NombreProductoAbreviatura: 'G95E5',
      }] as MineTurFuel[];
      httpClientMock.getFuels.mockResolvedValueOnce(mineTurFuels);

      // Act
      await client.getFuels();
      await client.getFuels({ forceRefresh: true });

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(2);
    });

    it('should not cache when the request fails, allowing subsequent retry', async () => {
      // Assemble
      const mineTurFuels = [{
        IDProducto: '1',
        NombreProducto: 'Gasolina 95 E5',
        NombreProductoAbreviatura: 'G95E5',
      }] as MineTurFuel[];
      httpClientMock.getFuels
        .mockRejectedValueOnce(createError())
        .mockResolvedValueOnce(mineTurFuels);

      // Act
      const firstCall = await client.getFuels();
      const secondCall = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(2);
      expect(firstCall).toEqual([]);
      expect(secondCall).toEqual(fuelsFixture);
    });
  });
});

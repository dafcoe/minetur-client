import { MineTurHttpClient } from '../http-client';
import {
  DISTRICTS_BY_REGION_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_BY_DISTRICT_URL,
  MUNICIPALITIES_URL,
  REGIONS_URL,
  STATIONS_BY_DISTRICT,
  STATIONS_BY_DISTRICT_AND_FUEL,
  STATIONS_BY_FUEL,
  STATIONS_BY_MUNICIPALITY,
  STATIONS_BY_MUNICIPALITY_AND_FUEL,
  STATIONS_BY_REGION_AND_FUEL_URL,
  STATIONS_BY_REGION_URL,
  STATIONS_URL,
} from '../http-client.constant';
import {
  mineTurDistrictMadridFixture,
  mineTurDistrictsFixture,
  mineTurFuelGasolinaFixture,
  mineTurFuelsFixture,
  mineTurMunicipalitiesFixture,
  mineTurMunicipalityMadridFixture,
  mineTurRegionMadridFixture,
  mineTurRegionsFixture,
  mineTurStationsResponseFixture,
} from './http-client.fixture';
import { expectFetchCallWithUrlAndHeaders, mockFetchFailure, mockFetchSuccess } from './http-client.spec-util';

describe('MineTurHttpClient', () => {
  let httpClient: MineTurHttpClient;

  beforeEach(() => {
    httpClient = new MineTurHttpClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getRegions', () => {
    it('should call REGIONS_URL with the correct headers and return a region DTO array', async () => {
      // Assemble
      mockFetchSuccess(mineTurRegionsFixture);

      // Act
      const response = await httpClient.getRegions();

      // Assert
      expectFetchCallWithUrlAndHeaders(REGIONS_URL);
      expect(response).toEqual(mineTurRegionsFixture);
    });

    it('should call REGIONS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getRegions();

      // Assert
      expectFetchCallWithUrlAndHeaders(REGIONS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getDistricts', () => {
    it('should call DISTRICTS_URL with the correct headers and return a district DTO array (without filters)', async () => {
      // Assemble
      mockFetchSuccess(mineTurDistrictsFixture);

      // Act
      const response = await httpClient.getDistricts();

      // Assert
      expectFetchCallWithUrlAndHeaders(DISTRICTS_URL);
      expect(response).toEqual(mineTurDistrictsFixture);
    });

    it('should call DISTRICTS_BY_REGION_URL with the correct headers and return a district DTO array (with filters)', async () => {
      // Assemble
      const { IDCCAA } = mineTurRegionMadridFixture;
      const expectedUrl = `${DISTRICTS_BY_REGION_URL}/${IDCCAA}`;
      mockFetchSuccess(mineTurDistrictsFixture);

      // Act
      const response = await httpClient.getDistricts({ IDCCAA });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurDistrictsFixture);
    });

    it('should call DISTRICTS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getDistricts();

      // Assert
      expectFetchCallWithUrlAndHeaders(DISTRICTS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getMunicipalities', () => {
    it('should call MUNICIPALITIES_URL with the correct headers and return a municipality DTO array (without filters)', async () => {
      // Assemble
      mockFetchSuccess(mineTurMunicipalitiesFixture);

      // Act
      const response = await httpClient.getMunicipalities();

      // Assert
      expectFetchCallWithUrlAndHeaders(MUNICIPALITIES_URL);
      expect(response).toEqual(mineTurMunicipalitiesFixture);
    });

    it('should call MUNICIPALITIES_BY_DISTRICT_URL with the correct headers and return a municipality DTO array (with filters)', async () => {
      // Assemble
      const { IDPovincia } = mineTurDistrictMadridFixture;
      const expectedUrl = `${MUNICIPALITIES_BY_DISTRICT_URL}/${IDPovincia}`;
      mockFetchSuccess(mineTurMunicipalitiesFixture);

      // Act
      const response = await httpClient.getMunicipalities({ IDPovincia });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurMunicipalitiesFixture);
    });

    it('should call MUNICIPALITIES_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getMunicipalities();

      // Assert
      expectFetchCallWithUrlAndHeaders(MUNICIPALITIES_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getFuels', () => {
    it('should call FUELS_URL with the correct headers and return a fuel DTO array', async () => {
      // Assemble
      mockFetchSuccess(mineTurFuelsFixture);

      // Act
      const response = await httpClient.getFuels();

      // Assert
      expectFetchCallWithUrlAndHeaders(FUELS_URL);
      expect(response).toEqual(mineTurFuelsFixture);
    });

    it('should call FUELS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getFuels();

      // Assert
      expectFetchCallWithUrlAndHeaders(FUELS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getStations', () => {
    it('should call STATIONS_URL with the correct headers and return a station DTO array (without filters)', async () => {
      // Assemble
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_URL with the correct headers and return a station DTO array (with empty filters)', async () => {
      // Assemble
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({});

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_REGION_URL with the correct headers and return a station DTO array (with IDCCAA filter)', async () => {
      // Assemble
      const { IDCCAA } = mineTurRegionMadridFixture;
      const expectedUrl = `${STATIONS_BY_REGION_URL}/${IDCCAA}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDCCAA });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_REGION_AND_FUEL_URL with the correct headers and return a station DTO array (with IDCCAA and IDProducto filters)', async () => {
      // Assemble
      const { IDCCAA } = mineTurRegionMadridFixture;
      const { IDProducto } = mineTurFuelGasolinaFixture;
      const expectedUrl = `${STATIONS_BY_REGION_AND_FUEL_URL}/${IDCCAA}/${IDProducto}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDCCAA, IDProducto });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_DISTRICT with the correct headers and return a station DTO array (with IDProvincia filter)', async () => {
      // Assemble
      const { IDPovincia: IDProvincia } = mineTurDistrictMadridFixture;
      const expectedUrl = `${STATIONS_BY_DISTRICT}/${IDProvincia}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDProvincia });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_DISTRICT_AND_FUEL with the correct headers and return a station DTO array (with IDProvincia and IDProducto filters)', async () => {
      // Assemble
      const { IDPovincia: IDProvincia } = mineTurDistrictMadridFixture;
      const { IDProducto } = mineTurFuelGasolinaFixture;
      const expectedUrl = `${STATIONS_BY_DISTRICT_AND_FUEL}/${IDProvincia}/${IDProducto}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDProvincia, IDProducto });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_MUNICIPALITY with the correct headers and return a station DTO array (with IDMunicipio filter)', async () => {
      // Assemble
      const { IDMunicipio } = mineTurMunicipalityMadridFixture;
      const expectedUrl = `${STATIONS_BY_MUNICIPALITY}/${IDMunicipio}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDMunicipio });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_MUNICIPALITY_AND_FUEL with the correct headers and return a station DTO array (with IDMunicipio and IDProducto filters)', async () => {
      // Assemble
      const { IDMunicipio } = mineTurMunicipalityMadridFixture;
      const { IDProducto } = mineTurFuelGasolinaFixture;
      const expectedUrl = `${STATIONS_BY_MUNICIPALITY_AND_FUEL}/${IDMunicipio}/${IDProducto}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDMunicipio, IDProducto });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_BY_FUEL with the correct headers and return a station DTO array (with IDProducto filter)', async () => {
      // Assemble
      const { IDProducto } = mineTurFuelGasolinaFixture;
      const expectedUrl = `${STATIONS_BY_FUEL}/${IDProducto}`;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDProducto });

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedUrl);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should fallback to STATIONS_URL when an unsupported filter combination is provided', async () => {
      // Assemble
      const { IDCCAA } = mineTurRegionMadridFixture;
      const { IDMunicipio } = mineTurMunicipalityMadridFixture;
      mockFetchSuccess(mineTurStationsResponseFixture);

      // Act
      const response = await httpClient.getStations({ IDCCAA, IDMunicipio });

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      expect(response).toEqual(mineTurStationsResponseFixture);
    });

    it('should call STATIONS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getStations();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });
});

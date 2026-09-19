import type {
  MineTurDistrict,
  MineTurFuel,
  MineTurMunicipality,
  MineTurRegion,
  MineTurStation,
  MineTurStations,
} from '../http-client.type';

// ###############################################################
// Regions
// ###############################################################

export const mineTurRegionAndaluciaFixture: MineTurRegion = {
  IDCCAA: '01',
  CCAA: 'Andalucia',
};

export const mineTurRegionMadridFixture: MineTurRegion = {
  IDCCAA: '13',
  CCAA: 'Madrid',
};

export const mineTurRegionsFixture: MineTurRegion[] = [
  mineTurRegionAndaluciaFixture,
  mineTurRegionMadridFixture,
];

// ###############################################################
// Districts
// ###############################################################

export const mineTurDistrictMadridFixture: MineTurDistrict = {
  IDPovincia: '28',
  Provincia: 'Madrid',
  IDCCAA: '13',
  CCAA: 'Madrid',
};

export const mineTurDistrictSevillaFixture: MineTurDistrict = {
  IDPovincia: '41',
  Provincia: 'Sevilla',
  IDCCAA: '01',
  CCAA: 'Andalucia',
};

export const mineTurDistrictsFixture: MineTurDistrict[] = [
  mineTurDistrictMadridFixture,
  mineTurDistrictSevillaFixture,
];

// ###############################################################
// Municipalities
// ###############################################################

export const mineTurMunicipalityMadridFixture: MineTurMunicipality = {
  IDMunicipio: '4354',
  Municipio: 'Madrid',
  IDPovincia: '28',
  Provincia: 'Madrid',
  IDCCAA: '13',
  CCAA: 'Madrid',
};

export const mineTurMunicipalityAlcobendasFixture: MineTurMunicipality = {
  IDMunicipio: '4258',
  Municipio: 'Alcobendas',
  IDPovincia: '28',
  Provincia: 'Madrid',
  IDCCAA: '13',
  CCAA: 'Madrid',
};

export const mineTurMunicipalitiesFixture: MineTurMunicipality[] = [
  mineTurMunicipalityMadridFixture,
  mineTurMunicipalityAlcobendasFixture,
];

// ###############################################################
// Fuels
// ###############################################################

export const mineTurFuelGasolinaFixture: MineTurFuel = {
  IDProducto: '1',
  NombreProducto: 'Gasolina 95 E5',
  NombreProductoAbreviatura: 'G95E5',
};

export const mineTurFuelGasoleoFixture: MineTurFuel = {
  IDProducto: '4',
  NombreProducto: 'Gasoleo A',
  NombreProductoAbreviatura: 'GOA',
};

export const mineTurFuelsFixture: MineTurFuel[] = [
  mineTurFuelGasolinaFixture,
  mineTurFuelGasoleoFixture,
];

// ###############################################################
// Stations
// ###############################################################

const mineTurStationEmptyPrices = {
  'Precio Adblue': '',
  'Precio Amoniaco': '',
  'Precio Biodiesel': '',
  'Precio Bioetanol': '',
  'Precio Biogas Natural Comprimido': '',
  'Precio Biogas Natural Licuado': '',
  'Precio Diésel Renovable': '',
  'Precio Gas Natural Comprimido': '',
  'Precio Gas Natural Licuado': '',
  'Precio Gases licuados del petróleo': '',
  'Precio Gasoleo B': '',
  'Precio Gasoleo Premium': '',
  'Precio Gasolina 95 E10': '',
  'Precio Gasolina 95 E25': '',
  'Precio Gasolina 95 E5 Premium': '',
  'Precio Gasolina 95 E85': '',
  'Precio Gasolina 98 E10': '',
  'Precio Gasolina 98 E5': '',
  'Precio Gasolina Renovable': '',
  'Precio Hidrogeno': '',
  'Precio Metanol': '',
};

export const mineTurStationMadridFixture: MineTurStation = {
  'C.P.': '28001',
  Dirección: 'CALLE ALCALÁ, 1',
  Horario: 'L-D: 07:00-22:00',
  Latitud: '40,416775',
  Localidad: 'MADRID',
  'Longitud (WGS84)': '-3,703790',
  Margen: 'D',
  Municipio: 'Madrid',
  'Precio Gasoleo A': '1,749',
  'Precio Gasolina 95 E5': '1,849',
  Provincia: 'MADRID',
  Remisión: 'dm',
  Rótulo: 'REPSOL',
  'Tipo Venta': 'P',
  '% BioEtanol': '0,0',
  '% Éster metílico': '0,0',
  IDEESS: '1234',
  IDMunicipio: '4354',
  IDProvincia: '28',
  IDCCAA: '13',
  ...mineTurStationEmptyPrices,
};

export const mineTurStationAlcobendasFixture: MineTurStation = {
  'C.P.': '28100',
  Dirección: 'AVENIDA DE LA CONSTITUCIÓN, 10',
  Horario: 'L-D: 06:00-23:00',
  Latitud: '40,546944',
  Localidad: 'ALCOBENDAS',
  'Longitud (WGS84)': '-3,643611',
  Margen: 'I',
  Municipio: 'Alcobendas',
  'Precio Gasoleo A': '1,699',
  'Precio Gasolina 95 E5': '1,799',
  Provincia: 'MADRID',
  Remisión: 'dm',
  Rótulo: 'CEPSA',
  'Tipo Venta': 'P',
  '% BioEtanol': '0,0',
  '% Éster metílico': '0,0',
  IDEESS: '5678',
  IDMunicipio: '4258',
  IDProvincia: '28',
  IDCCAA: '13',
  ...mineTurStationEmptyPrices,
};

export const mineTurStationsFixture: MineTurStation[] = [
  mineTurStationMadridFixture,
  mineTurStationAlcobendasFixture,
];

export const mineTurStationsResponseFixture: MineTurStations = {
  Fecha: '13/09/2026 22:00:00',
  ListaEESSPrecio: mineTurStationsFixture,
};

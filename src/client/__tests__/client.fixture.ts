import { District, Fuel, Municipality, Region } from '../client.type';

// ###############################################################
// Regions
// ###############################################################

export const regionAndaluciaFixture: Region = {
  id: '01',
  name: 'Andalucia',
};

export const regionMadridFixture: Region = {
  id: '13',
  name: 'Madrid',
};

export const regionsFixture: Region[] = [
  regionAndaluciaFixture,
  regionMadridFixture,
];

// ###############################################################
// Districts
// ###############################################################

export const districtMadridFixture: District = {
  id: '28',
  idRegion: '13',
  name: 'Madrid',
};

export const districtSevillaFixture: District = {
  id: '41',
  idRegion: '01',
  name: 'Sevilla',
};

export const districtsFixture: District[] = [
  districtMadridFixture,
  districtSevillaFixture,
];

// ###############################################################
// Municipalities
// ###############################################################

export const municipalityMadridFixture: Municipality = {
  id: '4354',
  idDistrict: '28',
  idRegion: '13',
  name: 'Madrid',
};

export const municipalityAlcobendasFixture: Municipality = {
  id: '4258',
  idDistrict: '28',
  idRegion: '13',
  name: 'Alcobendas',
};

export const municipalitiesFixture: Municipality[] = [
  municipalityMadridFixture,
  municipalityAlcobendasFixture,
];

// ###############################################################
// Fuels
// ###############################################################

export const fuelGasolinaFixture: Fuel = {
  id: '1',
  name: 'Gasolina 95 E5',
  abbreviation: 'G95E5',
};

export const fuelGasoleoFixture: Fuel = {
  id: '4',
  name: 'Gasoleo A',
  abbreviation: 'GOA',
};

export const fuelsFixture: Fuel[] = [
  fuelGasolinaFixture,
  fuelGasoleoFixture,
];

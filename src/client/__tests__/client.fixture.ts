import {
  District,
  Fuel,
  Municipality,
  Region,
  Station,
  StationFuel,
} from '../client.type';

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

// ###############################################################
// Stations
// ###############################################################

const updatedAtFixture = new Date(2026, 8, 13, 22, 0, 0).getTime();

export const stationFuelGasolinaFixture: StationFuel = {
  ...fuelGasolinaFixture,
  price: '1,799',
  updatedAt: updatedAtFixture,
};

export const stationFuelGasoleoFixture: StationFuel = {
  ...fuelGasoleoFixture,
  price: '1,699',
  updatedAt: updatedAtFixture,
};

export const stationAFixture: Station = {
  id: '1234',
  brand: 'REPSOL',
  address: 'CALLE ALCALÁ, 1',
  town: 'MADRID',
  postalCode: '28001',
  latitude: 40.416775,
  longitude: -3.70379,
  schedule: 'L-D: 07:00-22:00',
  margin: 'D',
  municipality: 'Madrid',
  idMunicipality: '4354',
  district: 'MADRID',
  idDistrict: '28',
  idRegion: '13',
  saleType: 'P',
  remission: 'dm',
  bioEthanolPercentage: '0,0',
  methylEsterPercentage: '0,0',
  fuels: [
    stationFuelGasolinaFixture,
    stationFuelGasoleoFixture,
  ],
};

export const stationBFixture: Station = {
  id: '5678',
  brand: 'CEPSA',
  address: 'AVENIDA DE LA CONSTITUCIÓN, 10',
  town: 'ALCOBENDAS',
  postalCode: '28100',
  latitude: 40.546944,
  longitude: -3.643611,
  schedule: 'L-D: 06:00-23:00',
  margin: 'I',
  municipality: 'Alcobendas',
  idMunicipality: '4258',
  district: 'MADRID',
  idDistrict: '28',
  idRegion: '13',
  saleType: 'P',
  remission: 'dm',
  bioEthanolPercentage: '0,0',
  methylEsterPercentage: '0,0',
  fuels: [
    stationFuelGasolinaFixture,
    stationFuelGasoleoFixture,
  ],
};

export const stationsFixture: Station[] = [
  stationAFixture,
  stationBFixture,
];

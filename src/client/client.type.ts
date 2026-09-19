export interface Region {
  id: string;
  name: string;
}

export interface DistrictFilters {
  regionId?: string;
}

export interface District {
  id: string;
  idRegion: string;
  name: string;
}

export interface MunicipalityFilters {
  districtId?: string;
}

export interface Municipality {
  id: string;
  idDistrict: string;
  idRegion: string;
  name: string;
}

export interface Fuel {
  id: string;
  name: string;
  abbreviation: string;
}

export interface StationFuel extends Fuel {
  price: string;
  updatedAt: number;
}

export interface StationFilters {
  regionId?: string;
  districtId?: string;
  municipalityId?: string;
  fuelId?: string;
}

export interface Station {
  id: string;
  brand: string;
  address: string;
  town: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  schedule: string;
  margin: string;
  municipality: string;
  idMunicipality: string;
  district: string;
  idDistrict: string;
  idRegion: string;
  saleType: string;
  remission: string;
  bioEthanolPercentage: string;
  methylEsterPercentage: string;
  fuels: StationFuel[];
}

export interface FetchOptions {
  forceRefresh?: boolean;
}

export type CacheResource =
  | 'regions'
  | 'districts'
  | 'municipalities'
  | 'fuels';
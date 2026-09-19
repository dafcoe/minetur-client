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

export interface FetchOptions {
  forceRefresh?: boolean;
}

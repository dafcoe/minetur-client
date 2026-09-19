export const BASE_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes';

export const REGIONS_URL = `${BASE_URL}/Listados/ComunidadesAutonomas`;
export const DISTRICTS_URL = `${BASE_URL}/Listados/Provincias`;
export const DISTRICTS_BY_REGION_URL = `${BASE_URL}/Listados/ProvinciasPorComunidad`;
export const MUNICIPALITIES_URL = `${BASE_URL}/Listados/Municipios`;
export const MUNICIPALITIES_BY_DISTRICT_URL = `${BASE_URL}/Listados/MunicipiosPorProvincia`;
export const FUELS_URL = `${BASE_URL}/Listados/ProductosPetroliferos`;
export const STATIONS_URL = `${BASE_URL}/EstacionesTerrestres`;
export const STATIONS_BY_REGION_URL = `${BASE_URL}/EstacionesTerrestres/FiltroCCAA`;
export const STATIONS_BY_REGION_AND_FUEL_URL = `${BASE_URL}/EstacionesTerrestres/FiltroCCAAProducto`;
export const STATIONS_BY_DISTRICT = `${BASE_URL}/EstacionesTerrestres/FiltroProvincia`;
export const STATIONS_BY_DISTRICT_AND_FUEL = `${BASE_URL}/EstacionesTerrestres/FiltroProvinciaProducto`;
export const STATIONS_BY_MUNICIPALITY = `${BASE_URL}/EstacionesTerrestres/FiltroMunicipio`;
export const STATIONS_BY_MUNICIPALITY_AND_FUEL = `${BASE_URL}/EstacionesTerrestres/FiltroMunicipioProducto`;
export const STATIONS_BY_FUEL = `${BASE_URL}/EstacionesTerrestres/FiltroProducto`;

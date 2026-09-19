import { MineTurClient } from './client';

async function run() {
  const client = new MineTurClient();

  const regions = await client.getRegions();
  console.log(`${regions.length} regions found:`, regions);

  console.log('\n');

  const districts = await client.getDistricts();
  console.log(`${districts.length} districts found:`, districts);

  console.log('\n');

  const andaluziaDistricts = await client.getDistricts({ regionId: '01' });
  console.log(`${andaluziaDistricts.length} districts found on Andaluzia:`, andaluziaDistricts);

  console.log('\n');

  const municipalities = await client.getMunicipalities();
  console.log(`${municipalities.length} municipalities found:`, municipalities);

  console.log('\n');

  const sevillaMunicipalities = await client.getMunicipalities({ districtId: '41' });
  console.log(`${sevillaMunicipalities.length} municipalities found in Sevilla:`, sevillaMunicipalities);

  console.log('\n');

//   const brands = await client.getBrands();
//   console.log(`${brands.length} brands found:`, brands);
//
//   console.log('\n');
//
//   const stationTypes = await client.getStationTypes();
//   console.log(`${stationTypes.length} station types found:`, stationTypes);
//
//   console.log('\n');
//
//   const fuels = await client.getFuels();
//   console.log(`${fuels.length} fuels found:`, fuels);
//
//   console.log('\n');
//
//   const stations = await client.getStations();
//   console.log(`${stations.length} stations found:`, stations);
//
//   console.log('\n');
//
//   const castroMarimStations = await client.getStations({ municipalityIds: [107] });
//   console.log(`${castroMarimStations.length} stations found in Castro Marim:`, castroMarimStations);
}

run();

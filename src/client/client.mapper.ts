import { MineTurRegion } from '../http-client';
import { Region } from './client.type';

export function mapMineTurRegionToRegion(mineTurRegion: MineTurRegion): Region {
  return {
    id: mineTurRegion.IDCCAA,
    name: mineTurRegion.CCAA,
  };
}

export function mapMineTurRegionsToRegions(mineTurRegions: MineTurRegion[]): Region[] {
  return mineTurRegions.map(mapMineTurRegionToRegion);
}

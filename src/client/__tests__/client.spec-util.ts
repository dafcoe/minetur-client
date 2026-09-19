import { Mocked } from 'vitest';
import { MineTurHttpClient } from '../../http-client';
import { mapMineTurRegionsToRegions } from '../client.mapper';
import { regionsFixture } from './client.fixture';

export function createError(message = 'Network error'): Error {
  return new Error(message);
}

export function createHttpClientMock() {
  return {
    getRegions: vi.fn(),
  } as unknown as Mocked<MineTurHttpClient>;
}

export function mockMappers() {
  vi.mocked(mapMineTurRegionsToRegions).mockReturnValue(regionsFixture);
}

export function mockFetchSuccess<T>(result: T) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => result,
  } as Response);
}

export function mockFetchFailure(status = 500) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: false,
    status,
  } as Response);
}

export function expectFetchCallWithUrlAndHeaders(expectedUrl: string) {
  expect(fetch).toHaveBeenCalledWith(
    expectedUrl,
    expect.objectContaining({
      headers: expect.objectContaining({
        Accept: 'application/json',
        'User-Agent': expect.any(String),
      }),
    }),
  );
}

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/dev.ts',
        'src/**/index.ts',
        'src/**/*.spec.ts',
        'src/**/*.type.ts',
        'src/**/*.constant.ts',
        'src/**/*.fixture.ts',
      ],
    },
  },
});

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Coverage configuration:
  collectCoverage: true,               // Enable coverage collection
  coverageDirectory: 'coverage',       // Output directory for coverage reports
  coverageReporters: ['html', 'text', 'lcov'], // Report formats
  collectCoverageFrom: [               // Specify which files to collect coverage from
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/config/'],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

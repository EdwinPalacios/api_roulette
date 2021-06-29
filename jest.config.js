// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/prod_node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js}', '!src/index.ts'],
  coverageDirectory: 'test/coverage',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
    '^@ioc(.*)$': '<rootDir>/src/ioc$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1'
  },
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};

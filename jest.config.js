module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)(test).(ts|tsx)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__snapshots__/',
    'coverage',
    'test/cypress',
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '__stories__',
    'index.ts',
    'stories.ts',
    'stories.tsx',
    'reportWebVitals.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jestMocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jestMocks/styleMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
}

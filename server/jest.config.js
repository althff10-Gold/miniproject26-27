module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/logger.js'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterSetup: ['./tests/setup.js']
};

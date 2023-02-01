module.exports = {
  transform: {
    '^.+\\.tsx?s': 'ts-jest',
    '^.+\\.tsx?s': 'babel-jest',
    '^.+\\.babelx?s': 'babel-jest',
  },
  coveragePathIgnorePatterns: ['constants', 'external-urls.js'],
  collectCoverageFrom: ['src/utils/*.js'],
  coverageThreshold: {
    global: {
      lines: 98,
      branches: 96,
      functions: 100,
      statements: 98,
    }
  }
}
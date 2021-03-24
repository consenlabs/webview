module.exports = {
  verbose: true,

  // setupFiles: ['./tests/setup.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js'],

  testPathIgnorePatterns: ['/dist/', '/tests/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: '.*retry\\.test\\.(j|t)sx?$',

  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    'src/(.*)$': '<rootDir>/src/$1',
  },
}

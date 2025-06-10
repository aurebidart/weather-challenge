// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/tests/**/*.test.js']
};

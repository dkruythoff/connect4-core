const config = require('./jest.config')

module.exports = {
  ...config,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['lcov'], //'text' 'clover' 'json'
}

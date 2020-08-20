module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/js/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1'
  }
}

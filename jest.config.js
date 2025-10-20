/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
  roots: [
    "./src",
    "./test",
  ],
  moduleNameMapper: {'^@/(.*)$': '<rootDir>/src/$1',},
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    "js",
    "ts",
    "tsx",
    "css"
  ],
  reporters: [
      ["jest-xunit", { "filename": "xunit.xml" }] // We can't pass options from CLI
  ],
  clearMocks: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "^.+\\.css$": "jest-transform-css",
    "^.+\\.svg$": "jest-transform-stub",
  },

  transformIgnorePatterns: [
    "node_modules/(?!(hex-rgb))"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
};

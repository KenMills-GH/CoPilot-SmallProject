module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: ["script.js", "!node_modules/**"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/*.test.js"],
  moduleFileExtensions: ["js"],
  verbose: true,
};

module.exports = {
  setupFilesAfterEnv: [
    "jest-plugin-context/setup",
    "given2/setup",
    "<rootDir>/jest.setup.ts",
  ],
};

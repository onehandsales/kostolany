/** @type {import('jest').Config} */
module.exports = {
  projects: ['ios', 'android'].map((platform) => ({
    preset: `jest-expo/${platform}`,
    testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    clearMocks: true,
  })),
  collectCoverageFrom: ['App.tsx', 'src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // For transforming TypeScript files
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // Adjust if specific modules need to be transformed
  };
  
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	moduleDirectories: ['node_modules', __dirname],
	testEnvironment: 'node',
	setupFiles: ['dotenv/config'],
	modulePathIgnorePatterns: ["data"]
};

module.exports = createJestConfig(customJestConfig);
module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: [
		'**/*.(t|j)s',
		'!**/*.(module|dto|mock).ts',
		'!**/index.ts',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/typeorm/entities',
		'<rootDir>/typeorm/migrations',
		'<rootDir>/lib/types',
		'<rootDir>/modules',
		'<rootDir>/main.ts',
	],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	testTimeout: 60000,
	moduleNameMapper: {
		'@modules/(.*)': '<rootDir>/modules/$1',
		'@config/(.*)': '<rootDir>/config/$1',
		'@lib/(.*)': '<rootDir>/lib/$1',
		'@test/(.*)': '<rootDir>/../test/$1',
	},
}

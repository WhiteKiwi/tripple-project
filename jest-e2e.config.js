module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'test/e2e',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	testTimeout: 60000,
	moduleNameMapper: {
		'@modules/(.*)': '<rootDir>/../../src/modules/$1',
		'@config/(.*)': '<rootDir>/../../src/config/$1',
		'@lib/(.*)': '<rootDir>/../../src/lib/$1',
		'@test/(.*)': '<rootDir>/../$1',
	},
}

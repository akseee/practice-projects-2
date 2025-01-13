module.exports = {
	files: ['./src/**/*.{js}'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	settings: {},
	extends: [
		'plugin:prettier/recommended',
		'prettier',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:eslint-comments/recommended',
	],
	rules: {
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
	ignores: [
		'node_modules/**/*',
		'public/**/*',
		'eslint.config.js',
		'build/**/*',
		'dist/**/*',
		'package*.json',
		'**/*.d.ts',
	],
}

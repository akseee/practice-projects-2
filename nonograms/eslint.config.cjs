module.exports = {
	files: ['./src/**/*.js'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js'],
			},
		},
	},
	extends: [
		'plugin:prettier/recommended',
		'prettier',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:eslint-comments/recommended',
	],
	rules: {
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'error',
		'import/no-unresolved': 'error',
		'import/extensions': ['error', 'ignorePackages'],
	},
	ignorePatterns: [
		'node_modules/**/*',
		'public/**/*',
		'eslint.config.js',
		'build/**/*',
		'dist/**/*',
		'package*.json',
	],
}

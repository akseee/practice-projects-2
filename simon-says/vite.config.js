import { defineConfig } from 'vite'

export default defineConfig({
	base: './',
	build: {
		minify: false,
		emptyOutDir: true,
		sourcemap: true,
		outDir: 'dist',
		polyfillModulePreload: false,
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	esbuild: {
		legalComments: 'none',
	},
})

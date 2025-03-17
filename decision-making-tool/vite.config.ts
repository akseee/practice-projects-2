import { defineConfig } from "vite"
import path from "path"
import postcss from "postcss"

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  esbuild: {
    legalComments: "none",
  },
  css: {
    postcss: {
      plugins: [postcss()],
    },
  },
})

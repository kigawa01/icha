// vite.config.js
/// <reference types="vitest" />
import {defineConfig} from 'vite'
import * as path from "path";
import react from "@vitejs/plugin-react-swc";

// const src = path.resolve(__dirname, "front")
export default defineConfig({
  root: __dirname,
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: { // entry chunk assets それぞれの書き出し名の指定
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react"
    })
  ],
  optimizeDeps: {
    exclude: []
  },
  test: {
    include: ["front-test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
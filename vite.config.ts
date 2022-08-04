import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hieroglyphs: resolve(__dirname, 'hieroglyphs/index.html'),
        doubleMemories: resolve(__dirname, 'doubleMemories/index.html'),
        cats: resolve(__dirname, 'cats/index.html'),
        worldMap: resolve(__dirname, 'worldMap/index.html'),
        axe: resolve(__dirname, 'axe/index.html'),
        souvenir: resolve(__dirname, 'souvenir/index.html'),
      }
    }
  },
});

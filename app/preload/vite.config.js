import { defineConfig } from "vite";

const path_root = __dirname;

export default defineConfig({
  root: path_root,
  build: {
    lib: {
      entry: "preload",
      formats: ["cjs"],
      fileName: "preload",
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});

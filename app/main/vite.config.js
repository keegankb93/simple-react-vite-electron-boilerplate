import { defineConfig } from "vite";

const path_root = __dirname;

export default defineConfig({
  root: path_root,
  build: {
    lib: {
      entry: "main",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});

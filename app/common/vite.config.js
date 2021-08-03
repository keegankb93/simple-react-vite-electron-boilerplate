import { defineConfig } from "vite";
import { resolve, join } from "path";
import { path } from "osenv";

const path_root = __dirname;

export default defineConfig({
  root: path_root,
  build: {
    rollupOptions: {
      input: {
        database: resolve(path_root, "database.js"),
        check: resolve(path_root, "check.js"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "cjs",
      },
    },
  },
});

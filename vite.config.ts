/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true, // Enable global test APIs like `describe` and `it`
    environment: "jsdom", // Use jsdom for DOM-like testing
    // setupFiles: "./test/setup.ts", // Optional: Path to setup file for global configurations
  },
});

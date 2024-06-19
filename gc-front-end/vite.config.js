import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    testMatch: ["./tests/**/*.test.jsx$?"],
    globals: true,
  },
  server: {
    port: 5173,
  },
});
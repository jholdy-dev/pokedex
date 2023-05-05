import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const configTestVitest = {
  test: {
    environment: "happy-dom",
  },
} as any;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ...configTestVitest,
});

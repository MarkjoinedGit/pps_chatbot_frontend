import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/7800": {
        target: "https://zep.hcmute.fit",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

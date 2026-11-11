import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],

  server: {
    host: "0.0.0.0",

    proxy: {
      "/odoo-api": {
        target: "https://sizing-prodigy-canister.ngrok-free.dev",
        changeOrigin: true,
        secure: true,

        headers: {
          "ngrok-skip-browser-warning": "true",
        },

        rewrite: (path) => path.replace(/^\/odoo-api/, ""),
      },
    },
  },
});

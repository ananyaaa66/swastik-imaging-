import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const port = Number(process.env.PORT) || 3000;

  return {
    server: {
      host: "0.0.0.0",
      port,
      strictPort: true,
      allowedHosts: true,
      hmr: {
        clientPort: 443,
        protocol: "wss",
      },
      proxy: {
        "/api": {
          target: "http://localhost:8001",
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

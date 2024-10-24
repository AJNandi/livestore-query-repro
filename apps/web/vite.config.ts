import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const isProdBuild = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    {
      // Needed for OPFS Sqlite to work
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
          next()
        })
      },
    },
  ],
  optimizeDeps: {
    exclude: ["@repo/file-explorer", "@livestore/wa-sqlite"],
  },
  worker: isProdBuild ? { format: "es" } : undefined,
  resolve: {
    alias: [],
  },
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { GET } from "./api/getPrice";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "gold-price-api",
      configureServer(server) {
        server.middlewares.use("/api/getPrice", async (_req, res) => {
          try {
            const response = await GET();
            res.statusCode = response.status;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            res.end(await response.text());
          } catch (error) {
            console.error(error);
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unable to fetch gold prices" }));
          }
        });
      },
    },
  ],
});

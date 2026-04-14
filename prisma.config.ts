// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "@prisma/config";   // ← Note: different import for v6

export default defineConfig({
  schema: "./prisma/schema.prisma",
});
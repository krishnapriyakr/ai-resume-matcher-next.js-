// prisma.config.ts
import "dotenv/config"; // This line loads your .env.local file
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // This will now correctly pick up the URL from your .env.local
    url: process.env.DATABASE_URL,
  },
});
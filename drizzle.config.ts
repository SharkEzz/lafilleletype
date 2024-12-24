import { loadEnvFile } from 'node:process';
import { defineConfig } from 'drizzle-kit';

loadEnvFile();

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
});

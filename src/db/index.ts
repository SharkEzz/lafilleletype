import { loadEnvFile } from 'node:process';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

loadEnvFile();

export const db = drizzle(process.env.DB_FILE_NAME, {
  schema,
});

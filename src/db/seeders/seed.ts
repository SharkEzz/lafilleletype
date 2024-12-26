import { db } from '../index';
import * as schema from '../schema';
import data from './data.json';

async function main() {
  await db.insert(schema.tasks).values(data);
  console.log('Seeding completed');
}

main().catch(console.error);

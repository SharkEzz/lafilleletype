import { db } from '../index';
import * as schema from '../schema';

const STATIC_TASKS: (typeof schema.tasks.$inferInsert)[] = [
  {
    name: 'La petite friande',
  },
  {
    name: 'Cours de cuisine',
  },
  {
    name: 'Brunch',
  },
  {
    name: "Peinture à l'eau",
  },
  {
    name: 'Lego',
  },
  {
    name: 'SPA',
  },
  {
    name: 'Piscine / Jacuzzi',
  },
  {
    name: 'Disney',
  },
  {
    name: 'Paris',
  },
  {
    name: 'Aller à la mer',
  },
  {
    name: 'Regarder des films',
  },
  {
    name: 'Faire les soldes',
  },
  {
    name: 'Mamatte Reims',
  },
  {
    name: 'Lecture + échange + débrief',
  },
  {
    name: 'Amsterdam',
    description: 'Efteling',
  },
  {
    name: 'Volerie des aigles',
  },
  {
    name: 'Restaurant Black & White Troyes',
  },
  {
    name: 'Center Parks',
  },
  {
    name: 'La serre aux papillons',
  },
  {
    name: 'Versailles',
  },
  {
    name: 'Faire une galette des rois maison',
  },
  {
    name: 'Choisir un nouveau parfum',
  },
];

async function main() {
  await db.insert(schema.tasks).values(STATIC_TASKS);
  console.log('Seeding completed');
}

main().catch(console.error);

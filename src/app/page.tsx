import { db } from '@/db';

export default async function Home() {
  const tasks = await db.query.tasks.findMany();
  console.log(tasks);

  return <div className="text-xl font-bold">coucou</div>;
}

import { db } from '@/db';

export async function GET() {
  const tasks = await db.query.tasks.findMany({
    orderBy(fields, { desc }) {
      return desc(fields.id);
    },
  });
  return Response.json(tasks);
}

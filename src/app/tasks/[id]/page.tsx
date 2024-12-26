import { db } from '@/db';
import { notFound } from 'next/navigation';
import { TaskForm } from '../add/TaskForm';

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  if (Number.isNaN(id)) return notFound();

  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  return <TaskForm task={task} />;
}

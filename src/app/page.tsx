import { HomeCard } from '@/components/HomeCard';
import { db } from '@/db';
import type { SelectTask } from '@/db/schema';

export default async function Home() {
  const tasks: SelectTask[] = await db.query.tasks.findMany({
    orderBy(fields, operators) {
      return operators.desc(fields.id);
    },
  });

  const todoCount = tasks.reduce((prev, curr) => prev + (curr.isDone ? 0 : 1), 0);
  const doneCount = tasks.length - todoCount;

  const pinnedTasks = tasks.filter((t) => t.isPinned);

  return (
    <>
      <h2 className="font-bold text-lg mb-4">Épinglés</h2>
      <div className="grid grid-cols-3 gap-4">
        {pinnedTasks.map((t) => (
          <HomeCard task={t} key={t.id} />
        ))}
      </div>
      <hr className="my-6" />
      <div className="flex gap-2 justify-between mb-4">
        <p>{todoCount} trucs à faire pour le moment 👀</p>
        <p>{doneCount} trucs faits</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t) => (
          <HomeCard key={t.id} task={t} />
        ))}
      </div>
    </>
  );
}

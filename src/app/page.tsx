import { HomeCard } from '@/components/HomeCard';
import { PinnedTasks } from '@/components/Pages/Home/PinnedTasks';
import { ResponsiveGrid } from '@/components/Pages/Home/ResponsiveGrid';
import { db } from '@/db';
import type { SelectTask } from '@/db/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const tasks: SelectTask[] = await db.query.tasks.findMany({
    orderBy(fields, { desc }) {
      return desc(fields.id);
    },
  });

  const pinnedTasks = tasks.filter((t) => t.isPinned);
  const todoTasks = tasks.filter((t) => !t.isDone);
  const doneTasks = tasks.filter((t) => t.isDone);

  return (
    <>
      <PinnedTasks tasks={pinnedTasks} />
      <div className="flex gap-2 justify-between mb-4">
        <p>{todoTasks.length} trucs à faire pour le moment 👀</p>
        <p>{doneTasks.length} trucs faits</p>
      </div>
      <ResponsiveGrid>
        {todoTasks.map((t) => (
          <HomeCard key={t.id} task={t} />
        ))}
      </ResponsiveGrid>
      <hr className="my-6" />
      <h2 className="font-bold text-lg mb-4">Fait</h2>
      <ResponsiveGrid>
        {doneTasks.map((t) => (
          <HomeCard task={t} key={t.id} />
        ))}
      </ResponsiveGrid>
    </>
  );
}

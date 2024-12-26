import { db } from '@/db';
import type { SelectTask } from '@/db/schema';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Check, Edit, X } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Button } from '../ui/button';

export function HomeCard({ task }: { task: SelectTask }) {
  async function markAsDone(id: number) {
    'use server';

    await db.update(schema.tasks).set({ isDone: true }).where(eq(schema.tasks.id, id));
    revalidatePath('/', 'page');
  }

  async function markAsUndone(id: number) {
    'use server';

    await db.update(schema.tasks).set({ isDone: false }).where(eq(schema.tasks.id, id));
    revalidatePath('/', 'page');
  }

  return (
    <div className="shadow-lg border rounded flex flex-col">
      <div className="p-3 grow">
        <h2 className="font-medium text-xl flex justify-between">
          {task.name}
          <div className="flex gap-2 items-center">
            <Link href={`/tasks/${task.id}`}>
              <Button type="button" title="Editer" size="icon-sm" variant="outline">
                <Edit />
              </Button>
            </Link>
            <span title={task.isDone ? 'Fait' : 'Non fait'}>
              {task.isDone ? (
                <Check className="text-emerald-600" strokeWidth={4} />
              ) : (
                <X className="text-red-600" strokeWidth={4} />
              )}
            </span>
          </div>
        </h2>
        {task.description ? <p className="text-gray-600 text-sm mt-3">{task.description}</p> : undefined}
      </div>
      <div className="border-t p-3 text-sm text-right">
        {task.isDone ? (
          <Button type="button" size="xs" variant="outline" onClick={markAsUndone.bind(null, task.id)}>
            <X />
            Marquer comme non fait
          </Button>
        ) : (
          <Button type="button" size="xs" variant="outline" onClick={markAsDone.bind(null, task.id)}>
            <Check />
            Marquer comme fait
          </Button>
        )}
      </div>
    </div>
  );
}

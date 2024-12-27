import { db } from '@/db';
import type { SelectTask } from '@/db/schema';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Check, Edit, Pin, PinOff, X } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Button } from '../ui/button';

export function HomeCard({ task }: { task: SelectTask }) {
  async function markAsDone() {
    'use server';

    await db.update(schema.tasks).set({ isDone: true }).where(eq(schema.tasks.id, task.id));
    revalidatePath('/', 'page');
  }

  async function markAsUndone() {
    'use server';

    await db.update(schema.tasks).set({ isDone: false }).where(eq(schema.tasks.id, task.id));
    revalidatePath('/', 'page');
  }

  async function togglePinTask() {
    'use server';

    await db.update(schema.tasks).set({ isPinned: !task.isPinned }).where(eq(schema.tasks.id, task.id));
    revalidatePath('/', 'page');
  }

  return (
    <div className="shadow-lg border rounded flex flex-col">
      <div className="p-3 grow">
        <h2 className="font-medium text-xl flex justify-between gap-2">
          {task.name}
          <div className="flex gap-2 items-center">
            <Button variant="outline" size="icon-sm" onClick={togglePinTask}>
              {task.isPinned ? <PinOff className="text-red-600" /> : <Pin className="text-emerald-600" />}
            </Button>
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
      <div className="border-t p-3 text-sm flex justify-between items-center">
        <div>
          <p>
            Prix : <span className="font-medium">{task.price ? `${task.price} €` : 'N/A'}</span>
          </p>
        </div>
        {task.isDone ? (
          <Button type="button" size="xs" variant="outline" onClick={markAsUndone}>
            <X />
            Marquer comme non fait
          </Button>
        ) : (
          <Button type="button" size="xs" variant="outline" onClick={markAsDone}>
            <Check />
            Marquer comme fait
          </Button>
        )}
      </div>
    </div>
  );
}

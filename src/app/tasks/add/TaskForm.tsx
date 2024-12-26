import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/db';
import type { SelectTask } from '@/db/schema';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';

function FormItem({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function TaskForm({ task = undefined }: { task?: SelectTask }) {
  const isEditing = !!task;

  async function createTask(formData: FormData) {
    'use server';

    const price = formData.get('price');

    const newTask: schema.InsertTask = {
      name: formData.get('name')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? undefined,
      price: price ? +price : undefined,
    };

    await db.insert(schema.tasks).values(newTask);
    revalidatePath('/');
    return redirect('/');
  }

  async function updateTask(formData: FormData) {
    'use server';
    if (!task) return;

    const price = formData.get('price');

    const updatedTask = {
      ...task,
      name: formData.get('name')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? undefined,
      price: price ? +price : undefined,
    };

    await db.update(schema.tasks).set(updatedTask).where(eq(schema.tasks.id, task.id));
    revalidatePath('/');
    return redirect('/');
  }

  async function deleteTask() {
    'use server';
    if (!task) return;

    await db.delete(schema.tasks).where(eq(schema.tasks.id, task.id));
    revalidatePath('/');
    return redirect('/');
  }

  return (
    <div className="max-w-full md:max-w-[500px] mx-auto">
      <form className="flex flex-col gap-4" action={isEditing ? updateTask : createTask}>
        <FormItem>
          <Label htmlFor="name">Nom*</Label>
          <Input id="name" name="name" defaultValue={task?.name} required />
        </FormItem>
        <FormItem>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={task?.description ?? undefined} />
        </FormItem>
        <FormItem>
          <Label htmlFor="price">Prix</Label>
          <Input type="number" min={0} id="price" name="price" defaultValue={task?.price ?? undefined} />
        </FormItem>
        <div className="flex gap-4">
          {isEditing && (
            <Button type="button" variant="destructive" onClick={deleteTask}>
              Supprimer
            </Button>
          )}
          <Link className="ml-auto" href="/">
            <Button type="button" variant="secondary">
              Retour
            </Button>
          </Link>
          <Button type="submit">Valider</Button>
        </div>
      </form>
    </div>
  );
}

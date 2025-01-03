import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  name: text('name', { length: 255, mode: 'text' }).notNull(),
  description: text('description', { mode: 'text' }),
  price: real('price'),
  isDone: integer('is_done', { mode: 'boolean' }).notNull().default(false),
  isPinned: integer('is_pinned', { mode: 'boolean' }).notNull().default(false),
});
export type SelectTask = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

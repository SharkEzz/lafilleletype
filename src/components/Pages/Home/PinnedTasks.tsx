import { HomeCard } from '@/components/HomeCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { SelectTask } from '@/db/schema';
import { ResponsiveGrid } from './ResponsiveGrid';

export function PinnedTasks({ tasks }: { tasks: SelectTask[] }) {
  return (
    <Accordion type="single" collapsible className="mb-6">
      <AccordionItem value="pinned">
        <AccordionTrigger>
          <h2 className="font-bold text-lg">Épinglés</h2>
        </AccordionTrigger>
        <AccordionContent>
          <ResponsiveGrid>
            {tasks.length === 0 && <p className="font-medium">Aucune tâche épinglée</p>}
            {tasks.map((t) => (
              <HomeCard task={t} key={t.id} />
            ))}
          </ResponsiveGrid>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

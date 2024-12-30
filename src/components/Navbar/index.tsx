import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <div className="py-4 border-b">
      <div className="container px-2 mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-2xl">Trucs à faire</h1>
          <span>Pour baby et poupée</span>
        </Link>
        <Link href="/tasks/add">
          <Button>
            <Plus /> Ajouter
          </Button>
        </Link>
      </div>
    </div>
  );
}

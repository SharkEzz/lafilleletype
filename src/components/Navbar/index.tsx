import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <div className="py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-xl">Trucs à faire</h1>
          <span>Pour le type et la fille</span>
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

import './globals.css';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'La fille et le type',
  description: 'Krkrkr',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
        <div className="sticky top-0 left-0 bg-white shadow">
          <Navbar />
        </div>
        <div className="container mx-auto px-2 my-4">{children}</div>
      </body>
    </html>
  );
}

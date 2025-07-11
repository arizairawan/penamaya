import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PenaMaya - Personal Blog',
  description: 'A personal blog platform for writers and creators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('relative h-full font-body antialiased', inter.className)}>
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
          <Footer />
        </main>
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}

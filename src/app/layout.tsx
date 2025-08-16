import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/shared/theme-provider';
import { getAuthorProfile } from '@/lib/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getAuthorProfile();

  return {
    title: {
      default: `${profile.name} - Personal Blog`,
      template: `%s | ${profile.name}`,
    },
    description: profile.metadesc,
    keywords: profile.keyword,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: `${profile.name} - Personal Blog`,
      description: profile.metadesc,
      url: siteUrl,
      siteName: profile.name,
      images: [
        {
          url: 'https://placehold.co/1200x630.png',
          width: 1200,
          height: 630,
          alt: `${profile.name} Blog`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} - Personal Blog`,
      description: profile.metadesc,
      images: ['https://placehold.co/1200x630.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('relative h-full font-body antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </main>
          <Navbar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

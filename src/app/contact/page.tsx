import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a question or want to work together? Drop us a message using the contact form.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | PenaMaya',
    description: 'Have a question or want to work together? Drop us a message.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact Us | PenaMaya',
    description: 'Have a question or want to work together? Drop us a message.',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Get In Touch</CardTitle>
          <CardDescription>
            Have a question or want to work together? Drop a message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}

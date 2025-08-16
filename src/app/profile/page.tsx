
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorProfile } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const authorProfile = await getAuthorProfile();
  return {
    title: `Profile - ${authorProfile.name}`,
    description: authorProfile.metadesc,
    keywords: authorProfile.keyword,
    alternates: {
      canonical: '/profile',
    },
    openGraph: {
      title: `${authorProfile.name} | Profile`,
      description: authorProfile.bio,
      url: '/profile',
      images: [
        {
          url: authorProfile.picture,
          width: 200,
          height: 200,
          alt: authorProfile.name,
        },
      ],
    },
    twitter: {
      title: `${authorProfile.name} | Profile`,
      description: authorProfile.bio,
      images: [authorProfile.picture],
    },
  };
}

export default async function ProfilePage() {
  const authorProfile = await getAuthorProfile();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
      <Card className="overflow-hidden">
        <CardHeader className="text-center p-8 bg-secondary">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src={authorProfile.picture}
              alt={authorProfile.name}
              width={128}
              height={128}
              className="rounded-full border-4 border-card"
              data-ai-hint="author portrait"
            />
          </div>
          <CardTitle className="text-3xl font-bold">{authorProfile.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div 
            className="prose dark:prose-invert max-w-none text-center mx-auto mb-8 text-lg"
            dangerouslySetInnerHTML={{ __html: authorProfile.bio as string }}
          >
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Link href={authorProfile.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Link href={authorProfile.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Link href={authorProfile.socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Link href={authorProfile.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
              <Link href={authorProfile.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

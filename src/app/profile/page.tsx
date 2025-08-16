
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorProfile } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Github, Facebook, Instagram, Mail, Phone } from 'lucide-react';
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

const socialIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    facebook: Facebook,
    instagram: Instagram,
    youtube: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
    tiktok: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a4 4 0 1 0 4 4V8" />
        <path d="M16 4h-4a4 4 0 0 0-4 4v10" />
      </svg>
    ),
    email: Mail,
    phone: Phone,
};

export default async function ProfilePage() {
  const authorProfile = await getAuthorProfile();
  const socialLinks = Object.entries(authorProfile.socialMediaLinks).filter(([,url]) => url && url !== '#');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
      <Card className="overflow-hidden">
        <CardHeader className="relative text-center p-0">
           {authorProfile.banner ? (
            <div className="absolute inset-0 bg-black/50">
                <Image
                src={authorProfile.banner}
                alt={`${authorProfile.name}'s banner`}
                fill
                className="object-cover opacity-50"
                data-ai-hint="header background"
                />
            </div>
          ) : (
            <div className="absolute inset-0 bg-primary/20"></div>
          )}
          <div className="relative z-10 py-12 px-4">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={authorProfile.picture}
                alt={authorProfile.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-card/80"
                data-ai-hint="author portrait"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-white">{authorProfile.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div 
            className="prose dark:prose-invert max-w-none text-center mx-auto mb-8 text-lg"
            dangerouslySetInnerHTML={{ __html: authorProfile.bio as string }}
          >
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map(([key, value]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                const link = key === 'email' ? `mailto:${value}` : key === 'phone' ? `tel:${value}` : value as string;
                if (!Icon) return null;

                return (
                    <Button key={key} asChild variant="outline" size="icon" className="rounded-full w-12 h-12">
                      <Link href={link} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </Link>
                    </Button>
                )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/firebase';
import type { BlogPost } from '@/lib/types';
import { RelatedBlogs } from '@/components/blog/related-blogs';
import { AdSpot } from '@/components/shared/ad-spot';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { BlogActions } from '@/components/blog/blog-actions';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<BlogPost | undefined> {
    const posts = await getBlogPosts();
    return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Postingan Tidak Ditemukan',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith('http') ? post.coverImage : `${siteUrl}${post.coverImage}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: postUrl,
      type: 'article',
      publishedTime: post.publicationDate,
      authors: [post.authorName],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();


  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
       <Button asChild variant="outline" className="rounded-full mb-8 bg-card/80 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke semua postingan
        </Link>
       </Button>
      <Card>
        <CardContent className="pt-6">
          <article>
            <header className="mb-8">
              <div className="relative h-72 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  data-ai-hint="writing creativity"
                  priority
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorImage} alt={post.authorName} data-ai-hint="author portrait" />
                    <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.authorName}</span>
                </div>
                <span>•</span>
                <time dateTime={post.publicationDate}>
                  {new Date(post.publicationDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-9 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content as string }}>
              </div>
              <aside className="md:col-span-3">
                <div className="sticky top-12">
                  <AdSpot />
                </div>
              </aside>
            </div>
          </article>

          <div className="mt-12">
            <BlogActions post={post} />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

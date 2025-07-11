import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { RelatedBlogs } from '@/components/blog/related-blogs';
import { AdSpot } from '@/components/shared/ad-spot';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { BlogActions } from '@/components/blog/blog-actions';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
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

export default function BlogDetailPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
       <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </Link>
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
              {new Date(post.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-9 prose dark:prose-invert max-w-none">
            {post.content}
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

      <Separator className="my-12" />

      <div className="mt-16">
        <RelatedBlogs currentPost={post} allPosts={blogPosts} />
      </div>
    </div>
  );
}

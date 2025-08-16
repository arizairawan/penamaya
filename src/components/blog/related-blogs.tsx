"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { recommendRelatedBlogs } from '@/ai/flows/recommend-related-blogs';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

interface RelatedBlogsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedBlogs({ currentPost, allPosts }: RelatedBlogsProps) {
  const [related, setRelated] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecommendations() {
      try {
        setLoading(true);
        const otherBlogTitles = allPosts
          .filter(p => p.id !== currentPost.id)
          .map(p => p.title);

        if (otherBlogTitles.length > 0) {
            const recommendations = await recommendRelatedBlogs({
                currentBlogContent: currentPost.contentText,
                existingBlogTitles: otherBlogTitles,
            });
            setRelated(recommendations);
        }
      } catch (error) {
        console.error("Gagal mendapatkan blog terkait:", error);
      } finally {
        setLoading(false);
      }
    }
    getRecommendations();
  }, [currentPost, allPosts]);

  const relatedPosts = allPosts.filter(p => related.includes(p.title));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artikel Terkait</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : relatedPosts.length > 0 ? (
          <ul className="space-y-4">
            {relatedPosts.map(post => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="font-medium text-primary">{post.title}</span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Tidak ada artikel terkait yang ditemukan.</p>
        )}
      </CardContent>
    </Card>
  );
}

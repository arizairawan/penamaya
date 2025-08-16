"use client";

import { useState, useEffect } from 'react';
import { getBlogPosts, getAuthorProfile } from '@/lib/firebase';
import type { BlogPost, AuthorProfile } from '@/lib/types';
import { BlogCard } from '@/components/blog/blog-card';
import { AdSpot } from '@/components/shared/ad-spot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [profile, setProfile] = useState<AuthorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [posts, profileData] = await Promise.all([
        getBlogPosts(),
        getAuthorProfile(),
      ]);
      setAllPosts(posts);
      setProfile(profileData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const allCategories = ['All', ...Array.from(new Set(allPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  const visiblePosts = filteredPosts.slice(0, visiblePostsCount);

  const handleLoadMore = () => {
    setVisiblePostsCount(prevCount => prevCount + POSTS_PER_PAGE);
  };
  
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setVisiblePostsCount(POSTS_PER_PAGE);
      setIsAnimating(false);
    }, 300); // Harus cocok dengan durasi animasi
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        {loading ? (
            <>
              <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">{profile?.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{profile?.tagline}</p>
          </>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-9">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className="rounded-full bg-card/80 backdrop-blur-sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
            </div>
          ) : (
            <div className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300",
              isAnimating ? 'opacity-0' : 'opacity-100'
            )}>
              {visiblePosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {!loading && visiblePostsCount < filteredPosts.length && (
            <div className="text-center mt-12">
              <Button onClick={handleLoadMore} size="lg" className="rounded-full" variant="outline">
                Muat Lebih Banyak Postingan
              </Button>
            </div>
          )}
        </div>
        <aside className="md:col-span-3">
          <div className="sticky top-12 flex flex-col gap-8">
            <AdSpot />
            <AdSpot />
          </div>
        </aside>
      </div>
    </div>
  );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[225px] w-full rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

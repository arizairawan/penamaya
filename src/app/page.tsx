"use client";

import { useState, useEffect } from 'react';
import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog/blog-card';
import { AdSpot } from '@/components/shared/ad-spot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const POSTS_PER_PAGE = 3;
const allCategories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
    }, 300); // Should match animation duration
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">PenaMaya</h1>
        <p className="text-lg text-muted-foreground mt-2">Insights, stories, and ideas from our authors.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-9">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300",
            isAnimating ? 'opacity-0' : 'opacity-100'
          )}>
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {visiblePostsCount < filteredPosts.length && (
            <div className="text-center mt-12">
              <Button onClick={handleLoadMore} size="lg" className="rounded-full">
                Load More Posts
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

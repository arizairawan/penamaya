import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog/blog-card';
import { AdSpot } from '@/components/shared/ad-spot';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">PenaMaya</h1>
        <p className="text-lg text-muted-foreground mt-2">Insights, stories, and ideas from our authors.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
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

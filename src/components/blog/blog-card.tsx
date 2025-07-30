import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-4">
          <div className="relative h-48 w-full overflow-hidden rounded-md">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="writing creativity"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-0">
          <Badge variant="secondary" className="mb-2">{post.category}</Badge>
          <CardTitle className="text-lg font-semibold leading-snug mb-2">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 pt-0">
           <span className="text-xs text-muted-foreground">{new Date(post.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <div className="flex items-center text-primary text-sm font-medium">
            Read More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

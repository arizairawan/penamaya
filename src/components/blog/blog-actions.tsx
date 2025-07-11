"use client";

import { useState } from 'react';
import { Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { type BlogPost } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface BlogActionsProps {
  post: BlogPost;
}

export function BlogActions({ post }: BlogActionsProps) {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "Blog post URL has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" onClick={() => setShowComments(!showComments)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {showComments ? 'Hide' : 'Show'} Comments
        </Button>
      </div>

      {showComments && (
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* This is a placeholder for actual comments */}
              <div className="flex items-start gap-4">
                <div className="text-sm">
                  <p className="font-semibold">Alex</p>
                  <p>Great article, really insightful!</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
               <Textarea placeholder="Write a comment..." />
               <Button className="self-end">Post Comment</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

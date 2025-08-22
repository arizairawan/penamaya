
"use client";

import { useState } from 'react';
import { Share2, MessageSquare, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BlogActionsProps {
  post: BlogPost;
}

export function BlogActions({ post }: BlogActionsProps) {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);

  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Tautan Disalin!",
        description: "URL postingan blog telah disalin ke clipboard Anda.",
      });
    });
  };

  const createShareLink = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(`Lihat artikel ini: ${post.title}`);
    
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${post.title}&summary=${post.summary}`;
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full bg-card/80 backdrop-blur-sm">
              <Share2 className="mr-2 h-4 w-4" />
              Bagikan
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => window.open(createShareLink('twitter'), '_blank')}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(createShareLink('facebook'), '_blank')}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(createShareLink('linkedin'), '_blank')}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyToClipboard}>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Salin Tautan</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button variant="outline" onClick={() => setShowComments(!showComments)} className="rounded-full bg-card/80 backdrop-blur-sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          {showComments ? 'Sembunyikan' : 'Tampilkan'} Komentar
        </Button> */}
      </div>

      {showComments && (
        <Card>
          <CardHeader>
            <CardTitle>Komentar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Ini adalah placeholder untuk komentar sebenarnya */}
              <div className="flex items-start gap-4">
                <div className="text-sm">
                  <p className="font-semibold">Alex</p>
                  <p>Artikel yang bagus, sangat berwawasan!</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
               <Textarea placeholder="Tulis komentar..." />
               <Button className="self-end rounded-full" variant="outline">Kirim Komentar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

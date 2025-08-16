import type { ReactNode } from 'react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  publicationDate: string;
  authorName: string;
  authorImage: string;
  content: ReactNode;
  contentText: string;
}

export interface AuthorProfile {
    name: string;
    bio: string;
    picture: string;
    socialMediaLinks: {
        twitter: string;
        linkedin: string;
        github: string;
        facebook: string;
        instagram: string;
    }
}

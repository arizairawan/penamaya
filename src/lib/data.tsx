import React from 'react';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  publicationDate: string;
  authorName: string;
  authorImage: string;
  content: React.ReactNode;
  contentText: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'the-art-of-storytelling',
    title: 'The Art of Storytelling in the Digital Age',
    summary: 'Exploring how ancient storytelling techniques can be adapted for modern digital platforms to create compelling narratives.',
    category: 'Creativity',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-05-15',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
      <div className="space-y-6">
        <p>In a world saturated with information, the ability to tell a good story is more valuable than ever. It's the key to cutting through the noise and connecting with your audience on a deeper, more emotional level.</p>
        <p>This post delves into the core principles of storytelling—character, conflict, and resolution—and explores how they can be effectively applied in various digital formats, from blog posts and social media to video and interactive content.</p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">"The universe is made of stories, not of atoms." - Muriel Rukeyser</blockquote>
        <p>We'll look at examples from successful brands and creators who have mastered the art of digital storytelling, and provide actionable tips you can use to improve your own narratives. Whether you're a marketer, a writer, or a business owner, you'll find valuable insights to help you engage and inspire.</p>
      </div>
    ),
    contentText: "In a world saturated with information, the ability to tell a good story is more valuable than ever. It's the key to cutting through the noise and connecting with your audience on a deeper, more emotional level. This post delves into the core principles of storytelling—character, conflict, and resolution—and explores how they can be effectively applied in various digital formats, from blog posts and social media to video and interactive content. We'll look at examples from successful brands and creators who have mastered the art of digital storytelling, and provide actionable tips you can use to improve your own narratives. Whether you're a marketer, a writer, or a business owner, you'll find valuable insights to help you engage and inspire."
  },
  {
    id: 2,
    slug: 'productivity-hacks-for-creators',
    title: '10 Productivity Hacks for Creative Minds',
    summary: 'Boost your creative output with these proven productivity techniques tailored for writers, designers, and artists.',
    category: 'Productivity',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-05-10',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
      <div className="space-y-6">
        <p>Creativity and productivity can sometimes feel like opposing forces. The pressure to produce can stifle the very creative spark you're trying to ignite. However, with the right strategies, you can build a system that fosters both.</p>
        <h3 className="text-xl font-semibold">1. The Pomodoro Technique</h3>
        <p>Work in focused 25-minute intervals, separated by short breaks. This helps maintain high energy levels and prevents burnout.</p>
        <h3 className="text-xl font-semibold">2. Time Blocking</h3>
        <p>Allocate specific blocks of time in your calendar for creative work, treating them as non-negotiable appointments. This ensures you're dedicating time to your most important tasks.</p>
        <p>By implementing these and other hacks discussed in this article, you can create a structured yet flexible workflow that allows your creativity to flourish.</p>
      </div>
    ),
    contentText: "Creativity and productivity can sometimes feel like opposing forces. The pressure to produce can stifle the very creative spark you're trying to ignite. However, with the right strategies, you can build a system that fosters both. The Pomodoro Technique: Work in focused 25-minute intervals, separated by short breaks. This helps maintain high energy levels and prevents burnout. Time Blocking: Allocate specific blocks of time in your calendar for creative work, treating them as non-negotiable appointments. This ensures you're dedicating time to your most important tasks. By implementing these and other hacks discussed in this article, you can create a structured yet flexible workflow that allows your creativity to flourish."
  },
  {
    id: 3,
    slug: 'building-a-personal-brand',
    title: 'How to Build a Personal Brand That Resonates',
    summary: 'A step-by-step guide to crafting an authentic personal brand that connects with your target audience and opens up new opportunities.',
    category: 'Personal Growth',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-05-01',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
       <div className="space-y-6">
        <p>In today's interconnected world, a strong personal brand is your most valuable asset. It's how you communicate your unique value proposition and build trust with your audience. But building a brand isn't about creating a persona; it's about amplifying who you already are.</p>
        <p>This guide will walk you through the essential steps of building a personal brand, from defining your niche and mission to creating content that showcases your expertise and personality. We will cover how to find your voice, identify your audience, and consistently deliver value.</p>
        <p>Authenticity is the cornerstone of a successful personal brand. People connect with real people, not with carefully curated facades. Be genuine, share your journey—both successes and failures—and let your passion shine through.</p>
      </div>
    ),
    contentText: "In today's interconnected world, a strong personal brand is your most valuable asset. It's how you communicate your unique value proposition and build trust with your audience. But building a brand isn't about creating a persona; it's about amplifying who you already are. This guide will walk you through the essential steps of building a personal brand, from defining your niche and mission to creating content that showcases your expertise and personality. We will cover how to find your voice, identify your audience, and consistently deliver value. Authenticity is the cornerstone of a successful personal brand. People connect with real people, not with carefully curated facades. Be genuine, share your journey—both successes and failures—and let your passion shine through."
  },
    {
    id: 4,
    slug: 'the-future-of-remote-work',
    title: 'The Future of Remote Work: Trends & Predictions',
    summary: 'Analyzing the shift towards remote work and what it means for employees and companies in the coming years.',
    category: 'Future of Work',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-04-25',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
       <div className="space-y-6">
        <p>The pandemic accelerated the adoption of remote work, but the trend is here to stay. Companies and employees are discovering the benefits of flexibility, autonomy, and a better work-life balance. But what does the future hold?</p>
        <p>We explore key trends like the rise of hybrid models, the importance of asynchronous communication, and the need for new tools to foster collaboration and culture in a distributed workforce. We also discuss the challenges, such as maintaining team cohesion and preventing burnout.</p>
        <p>The future of work is not just about location; it's about a fundamental shift in how we approach productivity, collaboration, and employee well-being.</p>
      </div>
    ),
    contentText: "The pandemic accelerated the adoption of remote work, but the trend is here to stay. Companies and employees are discovering the benefits of flexibility, autonomy, and a better work-life balance. But what does the future hold? We explore key trends like the rise of hybrid models, the importance of asynchronous communication, and the need for new tools to foster collaboration and culture in a distributed workforce. We also discuss the challenges, such as maintaining team cohesion and preventing burnout. The future of work is not just about location; it's about a fundamental shift in how we approach productivity, collaboration, and employee well-being."
  },
  {
    id: 5,
    slug: 'mindfulness-for-creatives',
    title: 'Embracing Mindfulness to Unlock Creativity',
    summary: 'Discover how mindfulness practices can help you overcome creative blocks and tap into a deeper well of inspiration.',
    category: 'Creativity',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-04-20',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
      <div className="space-y-6">
        <p>The creative process can be a rollercoaster of emotions. One day you're in the flow, and the next you're staring at a blank page. Mindfulness can be a powerful anchor during this process.</p>
        <p>This article explores simple mindfulness exercises, such as meditation and mindful walking, that can help calm the inner critic, improve focus, and open up new neural pathways for creative thought. By being present, you can connect more deeply with your ideas.</p>
      </div>
    ),
    contentText: "The creative process can be a rollercoaster of emotions. One day you're in the flow, and the next you're staring at a blank page. Mindfulness can be a powerful anchor during this process. This article explores simple mindfulness exercises, such as meditation and mindful walking, that can help calm the inner critic, improve focus, and open up new neural pathways for creative thought. By being present, you can connect more deeply with your ideas.",
  },
  {
    id: 6,
    slug: 'the-gig-economy',
    title: 'Navigating the Gig Economy as a Creator',
    summary: 'A practical guide for freelancers and independent creators on thriving in the gig economy.',
    category: 'Productivity',
    coverImage: 'https://placehold.co/600x400.png',
    publicationDate: '2024-04-15',
    authorName: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    content: (
      <div className="space-y-6">
        <p>The gig economy offers unprecedented freedom and flexibility, but it also comes with its own set of challenges. Managing finances, finding consistent work, and avoiding burnout are crucial for long-term success.</p>
        <p>We'll cover essential topics like setting your rates, marketing your services, and using tools to streamline your workflow. Whether you're a writer, designer, or consultant, these tips will help you build a sustainable and rewarding freelance career.</p>
      </div>
    ),
    contentText: "The gig economy offers unprecedented freedom and flexibility, but it also comes with its own set of challenges. Managing finances, finding consistent work, and avoiding burnout are crucial for long-term success. We'll cover essential topics like setting your rates, marketing your services, and using tools to streamline your workflow. Whether you're a writer, designer, or consultant, these tips will help you build a sustainable and rewarding freelance career.",
  }
];

export const authorProfile = {
  name: 'Jane Doe',
  bio: "A passionate writer, digital strategist, and lifelong learner, Jane has been sharing her insights on creativity, productivity, and personal branding for over a decade. When she's not writing, she's exploring new hiking trails or curling up with a good book.",
  picture: 'https://placehold.co/200x200.png',
  socialMediaLinks: {
    twitter: 'https://twitter.com/janedoe',
    linkedin: 'https://linkedin.com/in/janedoe',
    github: 'https://github.com/janedoe',
  },
};

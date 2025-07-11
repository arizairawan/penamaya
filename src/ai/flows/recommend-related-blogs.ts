'use server';

/**
 * @fileOverview AI agent that recommends related blog posts based on the content of the current article.
 *
 * - recommendRelatedBlogs - A function that handles the recommendation process.
 * - RecommendRelatedBlogsInput - The input type for the recommendRelatedBlogs function.
 * - RecommendRelatedBlogsOutput - The return type for the recommendRelatedBlogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRelatedBlogsInputSchema = z.object({
  currentBlogContent: z.string().describe('The content of the current blog post.'),
  existingBlogTitles: z.array(z.string()).describe('A list of titles of existing blog posts.'),
});
export type RecommendRelatedBlogsInput = z.infer<typeof RecommendRelatedBlogsInputSchema>;

const RecommendRelatedBlogsOutputSchema = z.array(z.string()).describe('A list of titles of blog posts related to the current blog post.');
export type RecommendRelatedBlogsOutput = z.infer<typeof RecommendRelatedBlogsOutputSchema>;

export async function recommendRelatedBlogs(input: RecommendRelatedBlogsInput): Promise<RecommendRelatedBlogsOutput> {
  return recommendRelatedBlogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRelatedBlogsPrompt',
  input: {schema: RecommendRelatedBlogsInputSchema},
  output: {schema: RecommendRelatedBlogsOutputSchema},
  prompt: `You are an expert blog content analyzer. Given the content of the current blog post, and a list of existing blog post titles, you will return a list of blog post titles that are related to the current blog post. Only return titles from the existingBlogTitles array.

Current Blog Post Content: {{{currentBlogContent}}}

Existing Blog Post Titles: {{#each existingBlogTitles}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Related Blog Post Titles:`, 
});

const recommendRelatedBlogsFlow = ai.defineFlow(
  {
    name: 'recommendRelatedBlogsFlow',
    inputSchema: RecommendRelatedBlogsInputSchema,
    outputSchema: RecommendRelatedBlogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

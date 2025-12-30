'use server';
/**
 * @fileOverview Generates relevant social media hashtags based on content and target platforms.
 *
 * - generateSocialMediaHashtags - A function that generates hashtags.
 * - GenerateSocialMediaHashtagsInput - The input type for the generateSocialMediaHashtags function.
 * - GenerateSocialMediaHashtagsOutput - The return type for the generateSocialMediaHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaHashtagsInputSchema = z.object({
  content: z.string().describe('The social media post content to generate hashtags for.'),
  platforms: z.array(z.string()).describe('The social media platforms the content will be posted on.'),
});
export type GenerateSocialMediaHashtagsInput = z.infer<typeof GenerateSocialMediaHashtagsInputSchema>;

const GenerateSocialMediaHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of suggested hashtags, including the # symbol.'),
});
export type GenerateSocialMediaHashtagsOutput = z.infer<typeof GenerateSocialMediaHashtagsOutputSchema>;

export async function generateSocialMediaHashtags(input: GenerateSocialMediaHashtagsInput): Promise<GenerateSocialMediaHashtagsOutput> {
  return generateSocialMediaHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaHashtagsPrompt',
  input: {schema: GenerateSocialMediaHashtagsInputSchema},
  output: {schema: GenerateSocialMediaHashtagsOutputSchema},
  prompt: `You are a social media expert specializing in hashtag strategy.

Based on the following content and target platforms, generate a list of 5-10 relevant and trending hashtags.
The hashtags should be tailored to maximize reach and engagement on the specified platforms.

Content: {{{content}}}
Platforms: {{#each platforms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Provide only the hashtags in the output.`,
});

const generateSocialMediaHashtagsFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaHashtagsFlow',
    inputSchema: GenerateSocialMediaHashtagsInputSchema,
    outputSchema: GenerateSocialMediaHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

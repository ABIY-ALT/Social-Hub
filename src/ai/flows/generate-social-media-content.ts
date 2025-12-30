'use server';
/**
 * @fileOverview Generates social media content based on a prompt and content goals.
 *
 * - generateSocialMediaContent - A function that generates social media content.
 * - GenerateSocialMediaContentInput - The input type for the generateSocialMediaContent function.
 * - GenerateSocialMediaContentOutput - The return type for the generateSocialMediaContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaContentInputSchema = z.object({
  prompt: z.string().describe('The prompt for generating social media content.'),
  contentGoal: z.enum(['awareness', 'promotion', 'education']).describe('The content goal (awareness, promotion, education).'),
  platform: z.enum(['Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok', 'YouTube']).describe('The social media platform.'),
});
export type GenerateSocialMediaContentInput = z.infer<typeof GenerateSocialMediaContentInputSchema>;

const GenerateSocialMediaContentOutputSchema = z.object({
  content: z.string().describe('The generated social media content.'),
});
export type GenerateSocialMediaContentOutput = z.infer<typeof GenerateSocialMediaContentOutputSchema>;

export async function generateSocialMediaContent(input: GenerateSocialMediaContentInput): Promise<GenerateSocialMediaContentOutput> {
  return generateSocialMediaContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaContentPrompt',
  input: {schema: GenerateSocialMediaContentInputSchema},
  output: {schema: GenerateSocialMediaContentOutputSchema},
  prompt: `You are a social media expert. Generate social media content for the following prompt, content goal, and platform.\n\nPrompt: {{{prompt}}}\nContent Goal: {{{contentGoal}}}\nPlatform: {{{platform}}}\n\nContent:`, 
});

const generateSocialMediaContentFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaContentFlow',
    inputSchema: GenerateSocialMediaContentInputSchema,
    outputSchema: GenerateSocialMediaContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

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
  topic: z.string().describe("The topic or keyword for the content."),
  contentType: z.string().describe("The type of content to generate (e.g., 'blog_post', 'social_media_post')."),
  tone: z.string().describe("The desired tone of voice for the content (e.g., 'Professional', 'Casual')."),
  additionalInfo: z.string().optional().describe("Any additional instructions, like target audience or key points to include."),
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
  prompt: `You are a professional content creator. Your task is to generate high-quality, engaging content based on the user's request.

Content Type: {{{contentType}}}
Topic: {{{topic}}}
Tone: {{{tone}}}
{{#if additionalInfo}}
Additional Instructions: {{{additionalInfo}}}
{{/if}}

Generate the content now.`, 
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

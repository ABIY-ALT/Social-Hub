'use server';
/**
 * @fileOverview Analyzes social media content for potential risks and provides safe rewrite recommendations.
 *
 * - analyzeContentRiskAndRewrite - A function that handles the content analysis and rewriting process.
 * - AnalyzeContentRiskAndRewriteInput - The input type for the analyzeContentRiskAndRewrite function.
 * - AnalyzeContentRiskAndRewriteOutput - The return type for the analyzeContentRiskAndRewrite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentRiskAndRewriteInputSchema = z.object({
  content: z
    .string()
    .describe('The social media content to analyze for potential risks.'),
  platform: z
    .string()
    .describe('The social media platform the content will be posted on (e.g., Facebook, X, Instagram).'),
  contentGoal: z
    .string()
    .describe('The goal of the content (e.g., awareness, promotion, education).'),
});
export type AnalyzeContentRiskAndRewriteInput = z.infer<
  typeof AnalyzeContentRiskAndRewriteInputSchema
>;

const AnalyzeContentRiskAndRewriteOutputSchema = z.object({
  riskAnalysis: z
    .string()
    .describe('An analysis of potential risks associated with the content (reputation, legal, security).'),
  safeRewriteRecommendation: z
    .string()
    .describe('A safe rewrite recommendation to mitigate identified risks.'),
});
export type AnalyzeContentRiskAndRewriteOutput = z.infer<
  typeof AnalyzeContentRiskAndRewriteOutputSchema
>;

export async function analyzeContentRiskAndRewrite(
  input: AnalyzeContentRiskAndRewriteInput
): Promise<AnalyzeContentRiskAndRewriteOutput> {
  return analyzeContentRiskAndRewriteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentRiskAndRewritePrompt',
  input: {schema: AnalyzeContentRiskAndRewriteInputSchema},
  output: {schema: AnalyzeContentRiskAndRewriteOutputSchema},
  prompt: `You are an AI-powered social media risk analysis tool.

You will analyze the provided social media content for potential risks related to reputation, legal issues, and security vulnerabilities.
Based on the analysis, you will provide a safe rewrite recommendation to mitigate these risks.

Content: {{{content}}}
Platform: {{{platform}}}
Content Goal: {{{contentGoal}}}

Respond with a risk analysis and a safe rewrite recommendation.

Risk Analysis:

Safe Rewrite Recommendation:`,
});

const analyzeContentRiskAndRewriteFlow = ai.defineFlow(
  {
    name: 'analyzeContentRiskAndRewriteFlow',
    inputSchema: AnalyzeContentRiskAndRewriteInputSchema,
    outputSchema: AnalyzeContentRiskAndRewriteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

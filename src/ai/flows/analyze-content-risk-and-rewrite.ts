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
  riskScore: z
    .enum(['Low', 'Medium', 'High'])
    .describe('An overall risk score for the content.'),
  riskCategories: z
    .array(z.string())
    .describe('A list of identified risk categories (e.g., Reputation, Legal, Security).'),
  riskAnalysis: z
    .string()
    .describe('A detailed analysis of potential risks associated with the content.'),
  safeRewriteRecommendation: z
    .string()
    .describe('A safe rewrite recommendation to mitigate identified risks.'),
  requiresApproval: z
    .boolean()
    .describe('Whether the content should require manual approval before posting based on the risk analysis.'),
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
  prompt: `You are an AI-powered social media risk analysis tool. Your task is to analyze social media content for potential risks and provide a safe rewrite.

You will analyze the provided content for potential risks related to reputation, legal issues, and security vulnerabilities.
Based on your analysis, you will:
1.  Assign a 'riskScore' of "Low", "Medium", or "High".
2.  Identify the relevant 'riskCategories' from: "Reputation", "Legal", "Security", "Brand Voice", "Claims", "Trivial". If no risks are found, use ["Trivial"].
3.  Provide a detailed 'riskAnalysis' explaining your reasoning.
4.  Suggest a 'safeRewriteRecommendation' to mitigate these risks. If no rewrite is needed, return the original content.
5.  Set 'requiresApproval' to true if the riskScore is 'Medium' or 'High', and false if it's 'Low'.

Content: {{{content}}}
Platform: {{{platform}}}
Content Goal: {{{contentGoal}}}

Respond with the structured output as defined.`,
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

'use server';
/**
 * @fileOverview A Genkit flow for generating marketing content (ad copy, newsletter, social, or WhatsApp).
 *
 * - generateMarketingCopy - A function that handles the marketing copy generation process.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  prompt: z
    .string()
    .describe('A brief prompt describing the desired marketing content (e.g., "ad copy for a new coffee shop", "WhatsApp promo message", or "newsletter about upcoming sales").'),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  marketingCopy: z.string().describe('The generated marketing content.'),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const marketingCopyPrompt = ai.definePrompt({
  name: 'marketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are an expert marketing content creator and social media strategist. Your task is to generate engaging and effective marketing content based on the user's prompt.

Guidelines:
1. If the prompt mentions "WhatsApp", ensure the message is concise, uses appropriate emojis, and includes a clear call to action.
2. If the prompt is for "Ad Copy", focus on a strong hook and value proposition.
3. If it's a "Newsletter", use a professional yet friendly tone with clear sections.
4. For "Social Posts", use hashtags and engaging questions.
5. Always ensure the tone is persuasive and tailored to the specific platform mentioned.

User Prompt: {{{prompt}}}`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async (input) => {
    const {output} = await marketingCopyPrompt(input);
    return output!;
  }
);

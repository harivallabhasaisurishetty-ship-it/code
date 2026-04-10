'use server';
/**
 * @fileOverview A Genkit flow for generating an initial draft of a business website's HTML and Tailwind CSS.
 *
 * - generateWebsiteDraft - A function that generates a website draft.
 * - GenerateWebsiteDraftInput - The input type for the generateWebsiteDraft function.
 * - GenerateWebsiteDraftOutput - The return type for the generateWebsiteDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteDraftInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessDescription: z
    .string()
    .describe('A detailed description of the business and its offerings.'),
  preferredStyle: z
    .string()
    .describe(
      'The preferred visual style for the website (e.g., modern, minimalist, corporate, vibrant).'
    ),
});
export type GenerateWebsiteDraftInput = z.infer<
  typeof GenerateWebsiteDraftInputSchema
>;

const GenerateWebsiteDraftOutputSchema = z.object({
  htmlContent: z
    .string()
    .describe(
      'The generated HTML and Tailwind CSS content for the website draft, ready to be embedded.'
    ),
});
export type GenerateWebsiteDraftOutput = z.infer<
  typeof GenerateWebsiteDraftOutputSchema
>;

export async function generateWebsiteDraft(
  input: GenerateWebsiteDraftInput
): Promise<GenerateWebsiteDraftOutput> {
  return generateWebsiteDraftFlow(input);
}

const generateWebsiteDraftPrompt = ai.definePrompt({
  name: 'generateWebsiteDraftPrompt',
  input: {schema: GenerateWebsiteDraftInputSchema},
  output: {schema: GenerateWebsiteDraftOutputSchema},
  prompt: `You are an expert web developer specializing in creating clean, modern, and responsive websites using HTML and Tailwind CSS.

Your task is to generate a complete HTML structure, including all necessary Tailwind CSS classes, for a draft website based on the provided business details.

Guidelines:
1.  The output must be a single block of HTML code, starting with an outer <div> or a similar container. Do NOT include <html>, <head>, or <body> tags. It should be suitable for direct insertion into an <iframe> or a content-editable div.
2.  Use Tailwind CSS classes exclusively for styling. Do not use inline styles or <style> tags.
3.  Include common sections for a business website: a navigation bar (with a placeholder logo/name and navigation links), a hero section, an about/services section, a testimonials/features section, and a footer.
4.  Populate the content with relevant information based on the business description.
5.  Ensure the design aligns with the preferred style.
6.  Make sure the generated text content is editable by adding 'contenteditable="true"' to appropriate text elements like headings, paragraphs, and list items.
7.  The website should be fully responsive.

Business Name: {{{businessName}}}
Business Description: {{{businessDescription}}}
Preferred Style: {{{preferredStyle}}}

---

Generate the HTML/Tailwind CSS website draft below:

`,
});

const generateWebsiteDraftFlow = ai.defineFlow(
  {
    name: 'generateWebsiteDraftFlow',
    inputSchema: GenerateWebsiteDraftInputSchema,
    outputSchema: GenerateWebsiteDraftOutputSchema,
  },
  async input => {
    const {output} = await generateWebsiteDraftPrompt(input);
    return output!;
  }
);

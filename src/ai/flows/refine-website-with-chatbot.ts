'use server';
/**
 * @fileOverview A Genkit flow for an AI chatbot assistant that helps refine website design.
 *
 * - refineWebsiteWithChatbot - A function that processes user commands for website design modifications.
 * - RefineWebsiteWithChatbotInput - The input type for the refineWebsiteWithChatbot function.
 * - RefineWebsiteWithChatbotOutput - The return type for the refineWebsiteWithChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RefineWebsiteWithChatbotInputSchema = z.object({
  userCommand:
    z.string()
    .describe('The natural language command from the user regarding website design modification (e.g., "Make the header blue", "Change the font of the body to Arial", "Add a new section for testimonials").'),
  currentWebsiteContext:
    z.string()
    .optional()
    .describe('Optional context about the current website layout or specific element under discussion, if available.'),
});
export type RefineWebsiteWithChatbotInput = z.infer<typeof RefineWebsiteWithChatbotInputSchema>;

const RefineWebsiteWithChatbotOutputSchema = z.object({
  responseForUser:
    z.string()
    .describe('A friendly natural language response acknowledging the command and describing the proposed change.'),
  suggestedModification:
    z.object({
      targetSelector:
        z.string()
        .optional()
        .describe('A CSS selector identifying the HTML element(s) to be modified (e.g., "header", ".main-button", "h1").'),
      cssProperties:
        z.record(z.string(), z.string())
        .optional()
        .describe('A dictionary of CSS properties and their new values if the modification is a style change (e.g., { "color": "blue", "font-size": "24px" }).'),
      newTextContent:
        z.string()
        .optional()
        .describe('New text content to be applied to the target element if the modification is a text change.'),
      action:
        z.enum(['style', 'content', 'layout', 'no_change'])
        .describe('The type of action to be performed: "style" for CSS changes, "content" for text changes, "layout" for structural changes (e.g. add/remove section), "no_change" if no direct modification is suggested.'),
      actionDetails:
        z.string()
        .optional()
        .describe('Further natural language details about the action, especially for "layout" changes or complex "content" changes.'),
    })
    .describe('A structured suggestion for the frontend to interpret and apply as a simulated change. Can be empty if no direct visual change is suggested or possible given the command.'),
});
export type RefineWebsiteWithChatbotOutput = z.infer<typeof RefineWebsiteWithChatbotOutputSchema>;

export async function refineWebsiteWithChatbot(
  input: RefineWebsiteWithChatbotInput
): Promise<RefineWebsiteWithChatbotOutput> {
  return refineWebsiteWithChatbotFlow(input);
}

const refineWebsiteWithChatbotPrompt = ai.definePrompt({
  name: 'refineWebsiteWithChatbotPrompt',
  input: { schema: RefineWebsiteWithChatbotInputSchema },
  output: { schema: RefineWebsiteWithChatbotOutputSchema },
  prompt: `You are an AI website design assistant for an entrepreneur. Your task is to interpret user commands regarding website design modifications and provide a friendly response, along with a structured JSON object detailing how a design modification could be applied. This is a simulation, so you are suggesting the change rather than directly applying it.\n\nIf the user asks for a styling change (e.g., color, font, size), set 'action' to 'style', specify 'targetSelector' and 'cssProperties'.\nIf the user asks for a content change (e.g., changing text), set 'action' to 'content', specify 'targetSelector' and 'newTextContent'.\nIf the user asks for a layout change (e.g., adding/removing a section, reordering elements), set 'action' to 'layout' and provide details in 'actionDetails'.\nIf the command is unclear or no direct modification is possible, set 'action' to 'no_change'.\n\nUser Command: {{{userCommand}}}\n\n{{#if currentWebsiteContext}}\nCurrent Website Context: {{{currentWebsiteContext}}}\n{{/if}}\n\nProvide your response and structured suggestion in the specified JSON format.`,
});

const refineWebsiteWithChatbotFlow = ai.defineFlow(
  {
    name: 'refineWebsiteWithChatbotFlow',
    inputSchema: RefineWebsiteWithChatbotInputSchema,
    outputSchema: RefineWebsiteWithChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await refineWebsiteWithChatbotPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI assistant.');
    }
    return output;
  }
);

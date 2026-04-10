import { config } from 'dotenv';
config();

import '@/ai/flows/generate-marketing-copy.ts';
import '@/ai/flows/generate-website-draft.ts';
import '@/ai/flows/refine-website-with-chatbot.ts';
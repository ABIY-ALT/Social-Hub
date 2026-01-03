import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {openai} from 'genkitx-openai';
import {config} from 'dotenv';

config();

const plugins = [];

if (process.env.GEMINI_API_KEY) {
    plugins.push(googleAI());
}

if (process.env.OPENAI_API_KEY) {
    plugins.push(openai({apiKey: process.env.OPENAI_API_KEY}));
}

genkit({
  plugins: plugins,
  defaultModel: 'openai/gpt-4-turbo',
});

export {ai};

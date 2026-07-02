import { client, instructions, keyState } from "../../config/openai.js";
import { GROQ_API_KEY, SECOND_GROQ_API_KEY } from '../../config/env.js';

setInterval(() => {
    keyState.current = GROQ_API_KEY;
    console.log('[Summarizer Services] Switched to main api key.');
}, 1000 * 60 * 5);

export const summarizerServices = async (headline, content) => {
    try {
        console.log('[Summarizer Services] Summarizing the article..');

        const AISummery = await client.responses.create({
            input: `Headline: ${headline} Full article: ${content}`,
            model: 'openai/gpt-oss-120b',
            instructions,
            text: { format: { type: "json_object" } },
            temperature: 0.2
        });
        return JSON.parse(AISummery.output_text);
    } catch (e) {
        if (e.status === 429) {
            console.error('[Summarizer Services] Token limit reached, switching to backup key!');
            keyState.current = SECOND_GROQ_API_KEY;
        } else {
            console.error('[Summarizer Services] ' + e);
        }
        return null;
    }
};
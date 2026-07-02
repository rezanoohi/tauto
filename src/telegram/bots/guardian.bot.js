import {Bot} from 'grammy';

import {GUARDIAN_BOT_TOKEN} from '../../config/env.js';
import {guardianServices} from "../../modules/guardian/guardian.services.js";
import {isArticleAlreadyPosted, saveArticleIdModel} from "../../modules/guardian/guardian.model.js";
import {summarizerServices} from "../../modules/ai/summarizer.services.js";

const bot = new Bot(GUARDIAN_BOT_TOKEN);


const enTag = '\n\n⚡️ Quick & Breaking Global News\n👉 🌐 @GlobalNewLive';
const faTag = '\n\n⚡️ خلاصه مهم‌ترین اخبار جهان\n👉 🌐 @GlobalNewLiveFa';

export const guardianBot = async () => {

    const postNews = async () => {
        try {
            const {id, headline, content} = await guardianServices();

            // Check if article already posted
            if (isArticleAlreadyPosted(id)) {
                console.log('[Guardian Bot] Article already posted, Skipping..');
                return;
            }

            const aiSummery = await summarizerServices(headline, content);

            if (aiSummery == null) {
                return;
            }

            await bot.api.sendMessage(-1004290570625, aiSummery['persian_summary'] + faTag, {parse_mode: "Markdown"});
            await bot.api.sendMessage(-1003928156915, aiSummery['english_summary'] + enTag, {parse_mode: "Markdown"});

            await saveArticleIdModel(id);
        } catch (e) {
            console.error('[Guardian Bot Eroor] ' + e);
        }
    }
    setInterval(postNews, 1000 * 60 * 5);

    await bot.start();
}
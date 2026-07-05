import {Bot} from 'grammy';

import {GUARDIAN_BOT_TOKEN} from '../../config/env.js';
import {guardianServices} from "../../modules/guardian/guardian.services.js";
import {isArticleAlreadyPosted, saveArticleIdModel} from "../../modules/guardian/guardian.model.js";
import {summarizerServices} from "../../modules/ai/summarizer.services.js";
import {postNewArticle} from "./postNewArticle.js";

const bot = new Bot(GUARDIAN_BOT_TOKEN);


const enTag = '\n\n⚡️ Quick & Breaking Global News\n👉 🌐 @GlobalNewLive';
const faTag = '\n\n⚡️ خلاصه مهم‌ترین اخبار جهان\n👉 🌐 @GlobalNewLiveFa';

export const guardianBot = async () => {

    const postNews = async () => {
        try {
            const {id, headline, content, thumbnail: photoUrl} = await guardianServices();

            if (isArticleAlreadyPosted(id)) {
                console.log('[Guardian Bot] Article already posted, Skipping..');
                return;
            }

            const aiSummery = await summarizerServices(headline, content);

            if (aiSummery == null) {
                return;
            }

            await postNewArticle(bot, -1003928156915, photoUrl, aiSummery.english_summary + enTag);
            await postNewArticle(bot, -1004290570625, photoUrl, aiSummery.persian_summary + faTag);
            await saveArticleIdModel(id);
        } catch (e) {
            console.error('[Guardian Bot Eroor] ' + e);
        }
    }
    setInterval(postNews, 1000 * 60 * 5);

    await bot.start();
}
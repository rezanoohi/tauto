import axios from 'axios'
import {htmlToText} from "html-to-text";

import {GUARDIAN_API_KEY} from "../../config/env.js";

export const guardianServices = async () => {
    try {
        const guardianResponse = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'show-fields': 'headline,body,thumbnail',
                'order-by': 'newest',
                'section': 'world',
                'tag': 'tone/news',
                'page-size': 20,
                // 'show-elements': 'image'
            }
        });

        const results = guardianResponse.data.response.results;
        const article = results.find(item => item.type === 'article');

        if (article) {
            const {id, fields: {headline, body, thumbnail}} = article;
            return {id, headline, content: htmlToText(body), thumbnail};
        } else {
            const {id, fields: {headline, body, thumbnail}} = results[0];
            return {id, headline, content: htmlToText(body), thumbnail};
        }
    } catch (e) {
        console.error('[Guardian Services] ' + e);
    }
}
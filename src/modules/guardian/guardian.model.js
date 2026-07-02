import {db} from '../../config/db.js';

export const isArticleAlreadyPosted = (articleId) => {
    return db.prepare('SELECT article_id FROM guardian WHERE article_id = ?').get(articleId);
}

export const saveArticleIdModel = (articleId) => {
    return db.prepare('INSERT INTO guardian(article_id) VALUES (?)').run(articleId);
}
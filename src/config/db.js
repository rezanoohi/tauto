import Database from 'better-sqlite3';

export const db = new Database('tauto.db');

db.exec(`CREATE TABLE IF NOT EXISTS guardian (
            article_id TEXT PRIMARY KEY
    );
`)
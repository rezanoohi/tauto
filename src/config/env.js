import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const {GUARDIAN_API_KEY, GROQ_API_KEY, SECOND_GROQ_API_KEY, GUARDIAN_BOT_TOKEN} = process.env;
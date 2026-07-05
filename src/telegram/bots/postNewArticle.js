export const postNewArticle = async (bot, chatId, photoUrl, caption) => {
    await bot.api.sendPhoto(chatId, photoUrl, {
        caption: caption,
        parse_mode: "Markdown"
    });
}
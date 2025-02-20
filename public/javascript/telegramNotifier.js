const axios = require("axios");
const { BOT_TOKEN, ALLOWED_USERS } = require("./config");

// Функция отправки сообщений в Telegram
async function sendTelegramMessage(message) {
    for (const userId of ALLOWED_USERS) {
        try {
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: userId,
                text: message,
                parse_mode: "Markdown"
            });
            console.log(`✅ Сообщение отправлено пользователю ${userId}`);
        } catch (error) {
            console.error(`❌ Ошибка отправки сообщения пользователю ${userId}:`, error.response ? error.response.data : error);
        }
    }
}

module.exports = { sendTelegramMessage };

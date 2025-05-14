require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { getGroupIds } = require("./listener");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

;(async () => {
  const groupIds = await getGroupIds();
  const message = `
  SADA ELD (Logbook) SERVICE

✅ As a client of ours, you will have access to the following services:

🟢 Audit

🟢 Monitoring

🟢 24/7 ELD support

🟢 Consulting service

🟢 Fixing Profile forms and BOLs

‼️ Currently, We have 2 weeks of FREE- trial, Contact us to try our high quality service for totally free! ‼️

For more info: @sada_manager
📞 (234) 413-1826 🇺🇸
📩 sadaeldservice@gmail.com
  `;

  if (!groupIds.length) {
    console.log("⚠️ No group IDs found, nothing to send.");
    return;
  }

  for (const chatId of groupIds) {
    try {
      await bot.sendMessage(chatId, message);
      console.log(`✅ Sent to ${chatId}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${chatId}:`, err.message);
    }
  }
})();

const { Markup } = require("telegraf");

exports.broadcastConfirm = Markup.inlineKeyboard([Markup.button.callback("✅ Tasdiqlash", "BROADCAST_CONFIRM"), Markup.button.callback("❌ Bekor qilish", "BROADCAST_CANCEL")]);
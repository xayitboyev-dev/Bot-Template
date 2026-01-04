const { Markup } = require('telegraf');

exports.adminMain = Markup.keyboard([
    ["📢 Broadcast", "📊 Statistika"],
    ["👤 Userga xabar", "🏠 Client"]
]).resize();

exports.main = Markup.keyboard([
    ["Example"],
]).resize();

exports.cancel = Markup.keyboard([
    ["🔙 Bekor qilish"]
]).resize();
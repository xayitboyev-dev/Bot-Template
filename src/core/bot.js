const { Telegraf } = require("telegraf");
const { COMMANDS } = require("../config/config.json");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands(COMMANDS);

module.exports = bot;
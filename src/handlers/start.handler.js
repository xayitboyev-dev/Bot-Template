const { START } = require("../constants/messages.constant");
const { main } = require("../keyboards/button.keyboard");
const userService = require("../services/user.service");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    try {
      await userService.getOrCreate(ctx.from);

      ctx.replyWithHTML(START, main);
    } catch (error) {
      console.error("Error in start handler:", error.message);
    };
  });
};
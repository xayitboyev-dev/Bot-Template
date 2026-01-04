const { UNKNOWN_COMMAND } = require("../constants/messages.constant");

module.exports = (bot) => {
    bot.on("text", async (ctx) => {
        await ctx.reply(UNKNOWN_COMMAND);
    });
};
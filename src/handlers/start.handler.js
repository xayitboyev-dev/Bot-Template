const userService = require("../services/user.service");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    try {
      await userService.getOrCreate(ctx.from);

      ctx.scene.enter("main");
    } catch (error) {
      console.error("Error in start handler:", error.message);
    };
  });
};
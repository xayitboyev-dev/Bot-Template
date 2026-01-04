const userService = require("../services/user.service");

module.exports = (bot) => {
    bot.command("admin", async (ctx, next) => {
        const user = await userService.getOrCreate(ctx.from);

        if (user.role === "OWNER") {
            ctx.scene.enter("admin:main");
        } else {
            next();
        };
    });
};
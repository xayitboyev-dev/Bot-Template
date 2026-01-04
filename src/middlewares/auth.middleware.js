module.exports = (bot) => {
    bot.use((ctx, next) => {
        if (!ctx.from) return;

        next();
    });
};
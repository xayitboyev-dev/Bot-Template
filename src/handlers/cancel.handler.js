module.exports = (bot) => {
    bot.hears("🔙 Bekor qilish", (ctx) => {
        ctx.scene.enter("main");
    });
};
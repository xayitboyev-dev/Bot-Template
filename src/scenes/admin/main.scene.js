const { Scenes } = require("telegraf");
const { ADMIN_SCENE_MAIN } = require("../../constants/messages.constant");
const { adminMain } = require("../../keyboards/button.keyboard");
const userService = require("../../services/user.service");

const scene = new Scenes.BaseScene("admin:main");

scene.enter((ctx) => {
    ctx.replyWithHTML(ADMIN_SCENE_MAIN, adminMain);
});

scene.hears("📢 Broadcast", (ctx) => {
    ctx.scene.enter("admin:broadcast");
});

scene.hears("👤 Userga xabar", (ctx) => {
    ctx.scene.enter("admin:sendTo");
});

scene.hears("📊 Statistika", async (ctx) => {
    const stats = await userService.getStatistics();

    ctx.replyWithHTML(`📊 Statistika\n\nActive userlar: <b>${stats.active}</b>\nNonActive userlar: <b>${stats.nonActive}</b>\nBarchasi: <b>${stats.total}</b>`);
});

scene.hears("🏠 Client", (ctx) => {
    ctx.scene.enter("main");
});

module.exports = scene;
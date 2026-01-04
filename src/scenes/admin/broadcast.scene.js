const { Scenes, Markup } = require("telegraf");
const userService = require("../../services/user.service");
const { broadcastConfirm } = require("../../keyboards/inline.keyboard");

const broadcastScene = new Scenes.WizardScene(
    "admin:broadcast",

    // STEP 1: ask for broadcast message
    async (ctx) => {
        await ctx.reply(
            "📢 Broadcast xabarini yuboring.\n\n" +
            "Bekor qilish uchun /cancel ni bosing."
        );
        return ctx.wizard.next();
    },

    // STEP 2: preview + confirmation
    async (ctx) => {
        if (ctx.message.text === "/cancel") {
            await ctx.reply("❌ Broadcast bekor qilindi");
            return ctx.scene.enter("admin:main");
        };

        ctx.wizard.state.messageId = ctx.msgId;

        await ctx.copyMessage(ctx.from.id);
        await ctx.reply("Tasdiqlaysizmi?", broadcastConfirm);

        return ctx.wizard.next();
    },

    // STEP 3: handle confirmation
    async (ctx) => {
        if (!ctx.callbackQuery) return;

        const action = ctx.callbackQuery.data;
        await ctx.answerCbQuery();

        if (action === "BROADCAST_CANCEL") {
            await ctx.reply("❌ Broadcast bekor qilindi");
            return ctx.scene.enter("admin:main");
        };

        if (action !== "BROADCAST_CONFIRM") return;

        ctx.deleteMessage();

        const users = await userService.getAllIds();

        let success = 0;
        let failed = 0;

        for (const userId of users) {
            try {
                await ctx.telegram.copyMessage(userId, ctx.from.id, ctx.wizard.state.messageId);
                success++;
            } catch (err) {
                failed++;
            };
        };

        await ctx.reply(
            "✅ Broadcast yakunlandi\n\n" +
            `📨 Yuborildi: ${success}\n` +
            `❌ Xatolik: ${failed}`
        );

        return ctx.scene.enter("admin:main");
    }
);

module.exports = broadcastScene;
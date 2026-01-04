const { Scenes } = require("telegraf");
const { broadcastConfirm } = require("../../keyboards/inline.keyboard");
const userService = require("../../services/user.service");

const sendToUserScene = new Scenes.WizardScene(
    "admin:sendTo",

    // STEP 1: ask for user ID
    async (ctx) => {
        await ctx.reply(
            "👤 Foydalanuvchi Telegram ID sini yuboring.\n\n" +
            "Bekor qilish uchun /cancel ni bosing."
        );
        return ctx.wizard.next();
    },

    // STEP 2: validate and save user ID
    async (ctx) => {
        if (ctx.message.text === "/cancel") {
            await ctx.reply("❌ Amal bekor qilindi");
            return ctx.scene.enter("admin:main");
        };

        const user = parseInt(ctx.message.text) ? await userService.getById(parseInt(ctx.message.text)) : null;

        if (!user) {
            await ctx.reply("❌ User topilmadi.");
            return;
        };

        ctx.wizard.state.targetUserId = user.id;

        await ctx.reply("📩 Yuboriladigan xabarni yozing:");
        return ctx.wizard.next();
    },

    // STEP 3: preview + confirmation
    async (ctx) => {
        if (ctx.message.text === "/cancel") {
            await ctx.reply("❌ Amal bekor qilindi");
            return ctx.scene.enter("admin:main");
        };

        ctx.wizard.state.messageId = ctx.msgId;

        // Preview (admin'ga)
        await ctx.copyMessage(ctx.from.id);
        await ctx.reply("Tasdiqlaysizmi?", broadcastConfirm);

        return ctx.wizard.next();
    },

    // STEP 4: send message
    async (ctx) => {
        if (!ctx.callbackQuery) return;

        const action = ctx.callbackQuery.data;
        await ctx.answerCbQuery();

        if (action === "BROADCAST_CANCEL") {
            await ctx.reply("❌ Yuborish bekor qilindi");
            return ctx.scene.enter("admin:main");
        };

        if (action !== "BROADCAST_CONFIRM") return;

        ctx.deleteMessage();

        try {
            await ctx.telegram.copyMessage(
                ctx.wizard.state.targetUserId,
                ctx.from.id,
                ctx.wizard.state.messageId
            );

            await ctx.reply("✅ Xabar muvaffaqiyatli yuborildi");
        } catch (err) {
            await ctx.reply("❌ Xabar yuborilmadi (user topilmadi yoki bloklagan)");
        };

        return ctx.scene.enter("admin:main");
    }
);

module.exports = sendToUserScene;
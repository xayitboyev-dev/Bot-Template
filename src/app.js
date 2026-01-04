const bot = require("./core/bot");
const session = require("./utils/session.util");
const stage = require("./scenes");

bot.use(session());
bot.use(stage.middleware());

// middlewares
require("./middlewares/auth.middleware")(bot);

// handlers inside stage
require("./handlers/start.handler")(bot);
require("./handlers/cancel.handler")(bot);
require("./handlers/onBlocked.handler")(bot);
require("./handlers/admin.handler")(bot);

// unknown handler - must be the last one
require("./handlers/unknown.handler")(bot);

module.exports = {
    async start() {
        if (process.env.NODE_ENV === "production") {
            // 🚀 PRODUCTION → webhook
            const PORT = parseInt(process.env.PORT) || 3000;
            const DOMAIN = process.env.WEBHOOK_DOMAIN;

            await bot.telegram.setWebhook(`${DOMAIN}/webhook`);

            server.listen(PORT, () => {
                console.log("🚀 Webhook server running on port", PORT);
            });
        } else {
            // 🧪 DEVELOPMENT → polling
            bot.launch();
            console.log("🧪 Bot running in POLLING mode");
        };
    },
    stop(signal) {
        console.log("Bot stopping:", signal);
        bot.stop(signal);
    }
};
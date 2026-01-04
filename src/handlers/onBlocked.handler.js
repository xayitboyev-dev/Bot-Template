const userService = require("../services/user.service");

module.exports = async function (bot) {
    bot.on("my_chat_member", async (ctx) => {
        try {
            if (ctx.myChatMember.new_chat_member.status !== "member") {
                await userService.deactivateUser(ctx.from.id);
                console.log(ctx.from.id, "is just kicked!");
            };
        } catch (error) {
            console.log(ctx.from.id, "failed on blocked handler!");
        };
    });
};
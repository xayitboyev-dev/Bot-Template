const { Scenes } = require("telegraf");
const { main } = require("../keyboards/button.keyboard");
const { START } = require("../constants/messages.constant");

const scene = new Scenes.BaseScene("main");

scene.enter((ctx) => {
    ctx.replyWithHTML(START, main);
});

module.exports = scene;
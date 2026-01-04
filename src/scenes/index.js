const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require("./main.scene"),
    require("./admin/main.scene"),
    require("./admin/broadcast.scene"),
    require("./admin/sendTo.scene"),
]);

module.exports = stage;
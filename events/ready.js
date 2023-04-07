const client = require("..")
const { ActivityType } = require("discord.js");
const moment = require("moment");
const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

client.on('ready', () => {
    client.user.setActivity("คนโง่", { type: ActivityType.Watching});
    log(`${client.user.tag} is online!`);
});
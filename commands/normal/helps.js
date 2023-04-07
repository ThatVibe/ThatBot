const { ChannelType  } = require("discord.js");

module.exports = {
    name: "helps",
    aliases: ["helps"],
    cooldown: 5000,
    run: async (client, message, args) => {
      message.delete();

    }
 };

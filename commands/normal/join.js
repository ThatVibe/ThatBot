const { Constants } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
    message.delete();
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      }
    }
    if (!voiceChannel) {
      return message.channel.send( `${client.emotes.error} | You must be in a voice channel or enter a voice channel id!` ).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    }
    message.channel.send(`${client.emotes.success} | The bot has join the channel.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    client.distube.voices.join(voiceChannel)
  }
}
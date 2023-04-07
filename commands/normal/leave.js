module.exports = {
    name: 'leave',
    run: async (client, message) => {
      message.delete();
      message.channel.send(`${client.emotes.error} | The bot has left the channel.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      client.distube.voices.leave(message)
    }
  }
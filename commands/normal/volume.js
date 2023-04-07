module.exports = {
    name: 'volume',
    aliases: ['v', 'set', 'set-volume'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      message.delete();
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      const volume = parseInt(args[0])
      if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      queue.setVolume(volume)
      message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    }
  }
  
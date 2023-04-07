module.exports = {
    name: 'autoplay',
    inVoiceChannel: true,
    run: async (client, message) => {
      message.delete();
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
      const autoplay = queue.toggleAutoplay()
      message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    }
  }
  
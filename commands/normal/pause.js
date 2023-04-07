module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
      message.delete();
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      if (queue.paused) {
        queue.resume()
        return message.channel.send('Resumed the song for you :)')
      }
      queue.pause()
      message.channel.send('Paused the song for you :)').then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    }
  }
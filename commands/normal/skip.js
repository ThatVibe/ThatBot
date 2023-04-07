module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    run: async (client, message) => {
      message.delete();
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      try {
        const song = await queue.skip()
        message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      }
    }
  }
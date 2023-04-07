module.exports = {
    name: 'loop',
    aliases: ['loop'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      message.delete();
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      let mode = null
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }
      mode = queue.setRepeatMode(mode)
      mode = mode ? (mode === 2 ? 'loop queue' : 'loop song') : 'Off'
      message.channel.send(`${client.emotes.repeat} | Set loop mode to \`${mode}\``).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
    }
  }
  
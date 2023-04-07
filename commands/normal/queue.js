module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
      message.delete();
      try{
        const queue = client.distube.getQueue(message)
        const q = queue.songs .map((song, i) => `${client.emotes.play} ${i === 0 ? ' Playing:' : `${client.emotes.queue} | ${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
        message.channel.send(q).then(msg => { setTimeout(() => { msg.delete(); }, 20000); });;
      }
      catch(e)
      {
          message.channel.send(`${client.emotes.queue} | The queue is currently empty!`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
      }
    }
  }
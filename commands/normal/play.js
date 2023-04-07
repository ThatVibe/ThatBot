
const { ChannelType  } = require("discord.js");
const { DisTube } = require("distube");


module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 5000,
    inVoiceChannel: true,
    run: async (client, message, args) => {

      message.delete();
      const channelName = "🎧-thatmusic-🎧";
      const musicChannel = message.guild.channels.cache.find((channel) => channel.name === channelName);
      
      if (musicChannel) {
        process.env.MUSICCHANNEL_ID = musicChannel.id;
        const string = args.join(' ')
        if (!string) return musicChannel.send(`${client.emotes.error} | Please enter a song url or query to search.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
        if(!message.member.voice.channel) return musicChannel.send(`${client.emotes.error} | Please join channel.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
        client.distube.play(message.member.voice.channel, string, { member: message.member, textChannel: message.channel, message })
        musicChannel.send(`${client.emotes.success} | Add ${ string } to queue.`).then(msg => { setTimeout(() => { msg.delete(); }, 20000); });
      } 
      else 
      {
        try 
        {
          const newChannel = await message.guild.channels.create( { name: channelName, type: ChannelType.GuildText,
            parent: message.channel.parent,
          });
          
          message.channel.send(`${client.emotes.success} | Created new channel: ${client.emotes.clickl} <#${newChannel.id}> ${client.emotes.clickf}`).then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
          const string = args.join(' ')

          if (!string) return newChannel.send(`${client.emotes.error} | Please enter a song url or query to search.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
          if(!message.member.voice.channel) return newChannel.send(`${client.emotes.error} | Please join channel.`).then(msg => { setTimeout(() => { msg.delete(); }, 5000); });
          client.distube.play(message.member.voice.channel, string, { member: message.member, textChannel: message.channel, message })
          newChannel.send(`${client.emotes.success} | Add ${ string } to queue.`).then(msg => { setTimeout(() => { msg.delete(); }, 20000); });

          process.env.MUSICCHANNEL_ID = newChannel.id;
        } 
        catch (e) 
        {
          console.log(e);
        }
      }
      
    }
  }
require("dotenv/config");
const config = require('./config.json')
const { Client, IntentsBitField, Collection, GatewayIntentBits, Partials, ChannelType  } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
module.exports = client;

client.config = require('./config.json');
client.emotes = config.emoji;
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnEmpty: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});


client.commands = new Collection()
client.commandaliases = new Collection()
const { readdirSync } = require("fs")

const commands = []
readdirSync('./commands/normal').forEach(async file => {
  const command = await require(`./commands/normal/${file}`);
  if(command) {
    client.commands.set(command.name, command)
    commands.push(command.name, command);
    if(command.aliases && Array.isArray(command.aliases)) {
       command.aliases.forEach(alias => {
        client.commandaliases.set(alias, command.name)  
})
}}})




const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(process.env.PREFIX)) 
  {
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.commandaliases.get(cmd));
    try 
    {
      await message.channel.sendTyping();
      command.run(client, message, args)
    } 
    catch  
    {
      await message.channel.sendTyping();
      message.reply(client.emotes.error +" | คำสั่งเหี้ยไรกูไม่รู้จัก ขออย่าโง่!");
    }
    return;
  }
  
  if (message.channel.id !== process.env.CHANNEL_ID) return;
  if(message.content.startsWith(".")) return;

  let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];

  try {
    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      if (message.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id !== message.author.id) return;

      conversationLog.push({
        role: 'user',
        content: msg.content,
      });
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });

    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});


require("./handler/index");

client.login(process.env.TOKEN);
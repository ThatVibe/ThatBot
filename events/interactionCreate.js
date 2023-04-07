const client = require("..");
client.on("interactionCreate", async(interaction) => {
    if(interaction.isChatInputCommand()){
        await interaction.deferReply({ ephemeral: false })
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.followUp({ content: `Unknown command!`, ephemeral: true });
        command.run(client, interaction);
    }
});
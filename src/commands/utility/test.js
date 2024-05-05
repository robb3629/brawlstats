const { SlashCommandBuilder } = require("discord.js")

module.exports={
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("dicane"),
    async execute(interaction) {
        await interaction.reply("dioporco")
    }
}
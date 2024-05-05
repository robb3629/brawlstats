const { SlashCommandBuilder } = require("discord.js")
// const { API_KEY } = require('../../../config.json')
// const url = `https://api.brawlstars.com/v1/players/%23{Option}`

module.exports={
    data: new SlashCommandBuilder()
        .setName("trophies")
        .setDescription("This command tells you the amount of trophies on your account")
        .addStringOption(option=>
            option.setName("playertag")
                    .setDescription("Insert the player tag")
                    .setRequired(true)
        ),
    async execute(interaction) {
        const playertag = interaction.options.get("playertag");
        // if (tag.startsWith("#")) {
        //     tag.replace("#", "")
        // }
        await interaction.reply(playertag)
    }
}
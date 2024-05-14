const {ApplicationCommandOptionType} = require("discord.js")
const url = `https://api.brawlstars.com/v1/players/%23`
const edge = require('../../oreo/edge')

module.exports={
        name : "trophies",
        description: "Tells you the amount of trophies on your account",
        options : [
            {
                name : "playertag",
                description: "Enter player tag",
                required : true,
                type : ApplicationCommandOptionType.String,
            }
        ],

        callback: async (client, interaction) => {
            const playertag = interaction.options.get("playertag").value
            if (playertag.startsWith("#")) {
            playertag.replace("#", "")
            }
            const diocane = url + playertag
            const gattino = await edge(diocane, interaction)

            interaction.reply({
                content: `You have ${gattino.trophies} trophies`
            })
        }
}
const {ApplicationCommandOptionType} = require('discord.js')
const edge = require('../../oreo/edge')
const url = `https://api.brawlstars.com/v1/players/%23`


module.exports = {
    name: 'solovictories',
    description : `This command tells you how many solo victories you have`,
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
            content: `You have ${gattino.soloVictories} solo victories`
        })
    }
}
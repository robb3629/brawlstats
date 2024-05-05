const { SlashCommandBuilder } = require("discord.js")
const { API_KEY } = require('../../../config.json')
const url = `https://api.brawlstars.com/v1/players/%23`

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
        const playertag = interaction.options.getString("playertag") ?? "No playertag given";
        if (playertag.startsWith("#")) {
            playertag.replace("#", "")
        }
        const diocane = url + playertag
        fetch(diocane,{
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            }
        }
    )

        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(error => console.log(error)
    )
    
        await interaction.reply(response.json["trophies"])
    }
}
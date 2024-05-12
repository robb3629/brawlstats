const {ApplicationCommandOptionType, Client, Interaction} = require("discord.js")
const { API_KEY } = require('../../config.json')
const url = `https://api.brawlstars.com/v1/players/%23`

module.exports={
        /**
         * 
         *  @param {Client} client
         *  @param {Interaction} interaction
         * 
         */


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

        callback: (client, interaction) => {
            const playertag = interaction.options.get("playertag").value
            if (playertag.startsWith("#")) {
            playertag.replace("#", "")
            }
            const diocane = url + playertag
            const gattino = fetch(diocane,{headers: {Authorization: `Bearer ${API_KEY}`,}})

            console.log(gattino.status_code)
        interaction.reply({
            content: `You have ${gattino.json.trophies} trophies.`,
            ephemeral: false,
        })
    
        }
}
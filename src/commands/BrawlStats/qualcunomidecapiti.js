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
            fetch(diocane,{
            headers: {
              Authorization: `Bearer ${API_KEY}`,
                }
             }
            )

            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    
        interaction.reply({
            content: `You have ${response.json.trophies} trophies.`,
            ephemeral: false,
        })
    
        }
}
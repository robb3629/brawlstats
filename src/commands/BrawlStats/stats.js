const {ApplicationCommandOptionType, EmbedBuilder, Colors} = require('discord.js')
const edge = require('../../oreo/edge')

module.exports={
    name: 'stats',
    description: 'This command shows you your statistics',
    options: [
        {
            name : "playertag",
            description: "Enter player tag",
            required : true,
            type : ApplicationCommandOptionType.String,
        }
    ],

    callback: async (client, interaction) => {
        const playertag = interaction.options.get("playertag").value
        if (playertag.startsWith("#")) {playertag.replace("#", "")}
        
        const gattino = await edge(playertag, interaction)
        const color = gattino.nameColor
        var hex = "#"+color.slice(4)

        const embed = new EmbedBuilder()
            .setTitle(`${gattino.name}`)
            .setColor(hex)
            .setDescription(`Trophies: ${gattino.trophies}
Solo victories: ${gattino.soloVictories}
Duo victories: ${gattino.duoVictories}
Trio victories: ${gattino['3vs3Victories']}
Club: ${gattino.club.name}`)
            .setFooter({text: `${gattino.tag}`})

        interaction.reply({embeds : [embed]})







    }
}
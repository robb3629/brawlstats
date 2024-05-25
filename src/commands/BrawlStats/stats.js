const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const edge = require('../../oreo/edge')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('This command shows you your statistics')
        .addStringOption(option => option
            .setName('playertag')
            .setDescription('Enter player tag')
            .setRequired(true)
        ),

     async execute(client, interaction) {
        const playertag = interaction.options.getString('playertag')
        const tag = playertag.startsWith('#') ? playertag.slice(1) : playertag;
        const gattino = await edge(tag, interaction)
        const color = gattino.nameColor
        var hex = "#"+color.slice(4)
        
        const embed = new EmbedBuilder()
            .setTitle(`${gattino.name}`)
            .setColor(hex)
            .setThumbnail(`https://cdn-old.brawlify.com/profile/${gattino.icon.id}.png`)
            .addFields(
                {name: 'Trophies', value: `${gattino.trophies}`, inline: true},
                {name: 'Highest trophies', value: `${gattino.highestTrophies}`, inline: true},
            )
            .setFooter({text: `${gattino.tag}`})
            if (gattino.club.name) {embed.addFields({name: 'Club', value: `${gattino.club.name}`, inline: true})}
            embed.addFields(
                { name: '\u200B', value: '\u200B' },
                {name: 'Solo victories', value: `${gattino.soloVictories}`, inline: true},
                {name: 'Duo victories', value: `${gattino.duoVictories}`, inline: true},
                {name: 'Trio victories', value: `${gattino['3vs3Victories']}`, inline: true}
            )

        interaction.reply({embeds : [embed]})
    }
}
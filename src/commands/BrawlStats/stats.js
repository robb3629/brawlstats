const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const edge = require('../../oreo/edge')
const playerTag = require('../../models/tags')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('This command shows you your statistics')
        .addStringOption(option => option
            .setName('playertag')
            .setDescription('Enter player tag')
        ),

     async execute(client, interaction) {

        function Stats(gattino){
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

            return embed
        }

        let playertags = interaction.options.getString('playertag')

        if (playertags) {
            if (playertags.startsWith('#')) {playertag = playertag.replace('#','')}
            gattino = await edge(playertags, interaction)
            const embed = Stats(gattino)
            interaction.reply({embeds : [embed]})
        } else {
            let taggy = await playerTag.findOne({userId: interaction.user.id})
            if (!taggy) {
                const embed = new EmbedBuilder()
                    .setTitle(`There was an error`)
                    .setColor('#7f1734')
                    .setDescription(`You don't have a playertag saved.`)
                    interaction.reply({embeds : [embed]})
            } else {
                gattino = await edge(taggy.thugger, interaction)
                const embed = Stats(gattino)
                interaction.reply({embeds : [embed]})
            }
        }
    }
}
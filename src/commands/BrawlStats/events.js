const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {API_KEY} = require('../../config.json')
const pagination = require('../../oreo/pagination')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('events')
        .setDescription('This command shows the ongoing events'),

    async execute(client, interaction) {
        try {
            const response = await fetch(`https://api.brawlstars.com/v1/events/rotation`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
    
            const gattino = await response.json();
            let embedarray = []
    
            for (x in gattino) {
                date = gattino[x].endTime // 20240602T080000.000Z
                usedate = date.slice(0,4)+ '-' + date.slice(4,6) + '-' + date.slice(6,11) + ':' + date.slice(11,13) + ':' + date.slice(13,20)
                const embed = new EmbedBuilder()
                    .setDescription(`${gattino[x].event.map}\nThe map resets: <t:${Math.floor((new Date(usedate)) / 1000)}:R>`)
                    .setImage(`https://cdn-old.brawlify.com/map/${gattino[x].event.id}.png`)
                    // .setFooter({text:`Ends: <t:${Math.floor((new Date('2024-06-01T08:00:00.000Z')) / 1000)}:R>`})
                    // .setTimestamp(new Date('2024-06-01T08:00:00.010Z'))
    
                if (gattino[x].event.mode == 'brawlBall') {
                    embed.setTitle('Brawl Ball')
                } else if (gattino[x].event.mode == 'soloShowdown') {
                    embed.setTitle('Solo Showdown')
                } else if (gattino[x].event.mode == 'hotZone') {
                    embed.setTitle('Hot Zone')
                } else if (gattino[x].event.mode == 'duoShowdown') {
                    embed.setTitle('Duo Showdown')
                } else if (gattino[x].event.mode == 'knockout') {
                    embed.setTitle('Knockout')
                } else if (gattino[x].event.mode == 'gemGrab') {
                    embed.setTitle('Gem Grab')
                } else if (gattino[x].event.mode == 'heist') {
                    embed.setTitle('Heist')
                } else if (gattino[x].event.mode == 'duels') {
                    embed.setTitle('Duels')
                } else if (gattino[x].event.mode == '') {
                    embed.setTitle('')
                } else if (gattino[x].event.mode == '') {
                    embed.setTitle('')
                }
    
                embedarray.push(embed)
            }
    
            pagination(interaction, embedarray)
    
        } catch (error) {
            console.log(`There was an error in the events command. Error: ${error}`)
        }
    }
}
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
 
                switch (gattino[x].event.mode) {
                    case 'brawlBall':
                        embed.setTitle('Brawl Ball')
                        break;
                    case 'soloShowdown':
                        embed.setTitle('Solo Showdown')
                        break;
                    case 'hotZone':
                        embed.setTitle('Hot Zone')
                        break;
                    case 'duoShowdown':
                        embed.setTitle('Duo Showdown')
                        break;
                    case 'knockout':
                        embed.setTitle('Knockout')
                        break;
                    case 'gemGrab':
                        embed.setTitle('Gem Grab')
                        break;
                    case 'heist':
                        embed.setTitle('Heist')
                        break;
                    case 'duels':
                        embed.setTitle('Duels')
                        break;
                    case 'wipeout':
                        embed.setTitle('Wipeout')
                        break;
                }
                embedarray.push(embed)
            }
    
            pagination(interaction, embedarray)
    
        } catch (error) {
            console.log(`There was an error in the events command. Error: ${error}`)
        }
    }
}
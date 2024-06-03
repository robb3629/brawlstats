const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const edge = require('../../oreo/edge')
const pagination = require('../../oreo/pagination')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('brawlers')
        .setDescription('This command shows you your brawlers')
        .addStringOption(option => option
            .setName('playertag')
            .setDescription('Enter player tag')
            .setRequired(true)
        ),

     async execute(client, interaction) {

        try {
            function getBrawlerArrays(brawlers) {
                let chunk = []
                let arrays = []
                for (let i = 0; i < brawlers.length; i++) {
                  chunk.push(brawlers[i]);
                //   console.log(`Index: ${i} Chunk: ${chunk}`)
                }
                for (let i = 0; i < chunk.length; i += 18) {
                  const pipo = chunk.slice(i, i + 18);
                  arrays.push(pipo);
                }
                return arrays
              }
    
    
    
            const playertag = interaction.options.getString('playertag')
            const tag = playertag.startsWith('#') ? playertag.slice(1) : playertag;
            const gattino = await edge(tag, interaction)
            const color = gattino.nameColor
            var hex = "#"+color.slice(4)
            const brawlers = gattino.brawlers
            
            const embeds = []
            const brawlerz = getBrawlerArrays(brawlers)
            // console.log(arrays)
    
            for (i=0; i<brawlerz.length; i++) {
                const emby = new EmbedBuilder()
                    .setTitle(`${gattino.name}'s brawlers`)
                    .setColor(hex)
                    .setFooter({text: `${gattino.tag}`})
                
                const ib = brawlerz[i]
                
                for (x in ib) {
                    emby.addFields({name: `${ib[x].name}`, value:`Rank: ${ib[x].rank} \u200B <:BStrophy:1228090386602393640> ${ib[x].trophies}/${ib[x].highestTrophies}`, inline: true})
                    // console.log(usaquestoarray[x])
                }
                embeds.push(emby)
                // console.log(arrays[i])
            }

            // console.log(embeds)
    
            await pagination(interaction, embeds)
        } catch (error) {
            console.log(`There was an error in the command: brawlers. ${error}`)
        }
    }
}
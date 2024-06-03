const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ComponentType, ButtonStyle, ActionRowBuilder } = require('discord.js')
const pagination = require('../../oreo/pagination')
const edge = require('../../oreo/edge')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testpagination')
        .setDescription('tests pagination'),

    async execute(client, interaction) {

        let index = 0;

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



        const playertag = "22882900u"
        const tag = playertag.startsWith('#') ? playertag.slice(1) : playertag;
        const gattino = await edge(tag, interaction)
        const color = gattino.nameColor
        var hex = "#"+color.slice(4)
        const brawlers = gattino.brawlers
        
        const brawlerz = getBrawlerArrays(brawlers)
        // console.log(arrays)

        let fartingBowser = [];

        const chunks = []
        const chunkSize = 18;

                
        for(const list of brawlerz) {
            for(const brawler of list) {
                fartingBowser.push(brawler)
            }
        }

        for(let i = 0; i < fartingBowser.length; i += chunkSize) {
            chunks.push(fartingBowser.slice(i, i + chunkSize))
        }

        const first = new ButtonBuilder()
        .setCustomId('pageFirst')
        .setEmoji('⏮')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
    
        const previous = new ButtonBuilder()
        .setCustomId('pagePrevious')
        .setEmoji('⏪')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)

        const next = new ButtonBuilder()
        .setCustomId('pageNext')
        .setEmoji('⏩')
        .setStyle(ButtonStyle.Primary)

        const last = new ButtonBuilder()
        .setCustomId('pageLast')
        .setEmoji('⏭')
        .setStyle(ButtonStyle.Primary)

        function row(page) {
            
            const pageCounter = new ButtonBuilder()
            .setCustomId('pageCounter')
            .setLabel(`${page}/${chunks.length}`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)

            const row = new ActionRowBuilder()
            .setComponents(previous, pageCounter, next)

            return row;
        }

        const emby = new EmbedBuilder()
        .setTitle(`sigmas's brawlers`)
        .setColor(hex)
        .setFooter({text: `dio bestia di un dio`})

        console.log("Test 1")

        interaction.reply({ embeds: [emby], components: [row(index + 1)], fetchReply: true}).then((messy) => {
            console.log("Test 2")
            const filter = (inty) => inty.customId === "pagePrevious" || inty.customId === "pageNext";
            const collector = messy.createMessageComponentCollector({ filter, time: 60000, componentType: ComponentType.Button });

            collector.on("collect", async (inty) => {
                if(inty.user.id !== interaction.user.id) {
                    return inty.reply({ content: "This is not your interaction", ephemeral: true });
                }

                switch(inty.customId) {
                    case "pagePrevious":
                        index--
                        if(index === -1) {
                            index = chunks.length - 1
                            await inty.update({ embeds: [emby], components: [row(index + 1)] })
                        }
                    case "pageNext": 
                        index++;
                        if(index < chunks.length)
                            inty.update({ embeds: [emby], components: [row(index + 1)] })
                        else {
                            index = 0
                            await inty.update({ embeds: [emby], components: [row(index + 1)] })
                        }
                }
            })


        })

    }
}
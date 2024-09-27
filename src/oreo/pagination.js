const {ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ChatInputCommandInteraction} = require('discord.js')

module.exports = async (interaction, pages, time = 300 * 1000) => {

    try {
        if(!interaction || !pages || !pages > 0) throw new Error('Invalid arguments')

        // await interaction.deferReply();

        if (pages.length === 1) {
            return await interaction.reply({embeds: pages, components: [], fetchReply: true})
        }

        var index = 0

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

        const pageCounter = new ButtonBuilder()
            .setCustomId('pageCounter')
            .setLabel(`${index + 1}/${pages.length}`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)

        const next = new ButtonBuilder()
        .setCustomId('pageNext')
        .setEmoji('⏩')
        .setStyle(ButtonStyle.Primary)

        const last = new ButtonBuilder()
        .setCustomId('pageLast')
        .setEmoji('⏭')
        .setStyle(ButtonStyle.Primary)

        const buttons = new ActionRowBuilder().addComponents([first, previous, pageCounter, next, last])

        await interaction.reply({embeds: [pages[index]], components: [buttons], fetchReply: true}).then(async msg => {
            const collector = await msg.createMessageComponentCollector({
                componentType: ComponentType.button,
                time
            })

            collector.on('collect', async i => {
                if (i.user.id !== interaction.user.id) return await i.update({content: `Only ${interaction.user.username} can use these buttons`, ephemeral: true})
    
                if (i.customId === 'pageFirst') {
                    index = 0
                    pageCounter.setLabel(`${index + 1}/${pages.length}`)
                }
    
                if (i.customId === 'pagePrevious') {
                    if (index > 0) index--
                    pageCounter.setLabel(`${index + 1}/${pages.length}`)
                } else if  (i.customId === 'pageNext')  {
                    if (index < pages.length - 1) {
                        index++
                        pageCounter.setLabel(`${index + 1}/${pages.length}`)
                    }
                } else if (i.customId === 'pageLast') {
                    index = pages.length - 1
                    pageCounter.setLabel(`${index + 1}/${pages.length}`)
                }
    
                if (index === 0) {
                    first.setDisabled(true)
                    previous.setDisabled(true)
                } else {
                    first.setDisabled(false)
                    previous.setDisabled(false)
                }
    
                if (index === pages.length-1) {
                    next.setDisabled(true)
                    last.setDisabled(true)
                } else {
                    next.setDisabled(false)
                    last.setDisabled(false)
                }
    
                // await msg.edit({embeds: [pages[index]], components: [buttons]}).catch(err => cd{})
                await i.update({embeds: [pages[index]], components: [buttons]}).catch(err => {})
    
                collector.resetTimer()
            } )
    
            collector.on('end', async () => {
                //await interaction.editReply({embeds: [pages[index]], components: []}).catch(err=>{})
                console.log("skibid toielt")
            })
        })
        
    } catch (error) {
        console.log(`An error occurred in pagination: ${error}`)
    }
}
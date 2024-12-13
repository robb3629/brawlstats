const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType0 } = require('discord.js')
const economy = require('../../models/economy')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cf')
        .setDescription('Allows you to flip a coin with other players')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Enter user')
            .setRequired(true)
        ),


    async execute(client, interaction) {
        const adversary = interaction.options.getUser('user')

        let embed
        
        const accept = new ButtonBuilder()
        .setCustomId('accept')
        .setEmoji('✅')
        .setStyle(ButtonStyle.Primary)

        const deny = new ButtonBuilder()
        .setCustomId('deny')
        .setEmoji('❌')
        .setStyle(ButtonStyle.Primary)

        const buttons = new ActionRowBuilder().addComponents([accept,deny])

        if (adversary.id === interaction.user) {
            embed = new EmbedBuilder()
                .setTitle(`You can't flip a coin with yourself!`)
                .setColor('Navy')
            
            await interaction.reply({embeds: [embed]})
            return
        }
         
        embed = new EmbedBuilder()
            .setTitle(`Coin Flip`)
            .setDescription(`<@${adversary.id}>`)
            .setColor('DarkRed')

            const response = await interaction.reply({embeds: [embed], components:[buttons]})

        const collectorFilter = i => i.user.id === adversary.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'accept') {
                let result = Math.floor(Math.random() * 2);

                if (result == 1) {
                    embed = new EmbedBuilder()
                        .setTitle(`Coin Flip`)
                        .setDescription(`${interaction.user} won!`)
                        .setColor('Navy')
                    
                    confirmation.update({embeds: [embed], components: []})
                } else {
                    embed = new EmbedBuilder()
                        .setTitle(`Coin Flip`)
                        .setDescription(`<@${adversary.id}> won!`)
                        .setColor('Navy')
                    
                    confirmation.update({embeds: [embed], components: []})
                }        
            } else if (confirmation.customId === 'deny') {
                embed = new EmbedBuilder()
                    .setTitle(`Coin Flip`)
                    .setDescription(`<@${adversary.id}> has declined the coin flip.`)

                await confirmation.update({ embeds: [embed], components: [] });
            }
        } catch (e) {
            embed = new EmbedBuilder()
                .setTitle(`Coin Flip`)
                .setDescription('Confirmation not received within 1 minute, cancelling')

            await interaction.editReply({ embeds: [embed], components: [] });
        }
    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const economy = require('../../models/economy')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Allows you to play rock paper scissors with other players')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Enter user')
        ),


    async execute(client, interaction) {
        const adversary = interaction.options.getUser('user')
        let embed

        if (adversary.id === interaction.user) {
            embed = new EmbedBuilder()
                .setTitle(`You can't play rock paper scissors with yourself!`)
                .setColor('Navy')
            
            interaction.reply({embeds: embed})
            return
        }

        

    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const economy = require('../../models/economy')

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`daily`)
        .setDescription('This command grants you your daily reward'),

    async execute(client, interaction) {

        let economyObj = await economy.findOne({userId: interaction.user.id})

        const today = new Date().toDateString()
        let LastDaily 
        if (economyObj.LastDaily) {LastDaily = economyObj.LastDaily.toDateString()} else {LastDaily = 0}
        let embed

        if (!economyObj) {
            economyObj = new economy({userId: interaction.user.id, Coins: 1000, LastDaily: new Date()})
            await economyObj.save()
            embed = new EmbedBuilder()
                .setTitle('You claimed your daily reward!')
                .setDescription(`New balance: ${economyObj.Coins} coins`)
                .setColor('DarkNavy')
        }

        if (today === LastDaily) {
            embed = new EmbedBuilder()
                .setTitle('You have already claimed your daily reward')
                .setColor('#7393B3')
        } else {
            economyObj.LastDaily = new Date()
            economyObj.Coins += 1000
            await economyObj.save()

            embed = new EmbedBuilder()
            .setTitle('You claimed your daily reward!')
            .setDescription(`New balance: ${economyObj.Coins} coins`)
            .setColor('#B47563')
        }

        interaction.reply({embeds: [embed]})
        

    }


}

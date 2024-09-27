const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const economy = require('../../models/economy')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('This command tells you your balance amount')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Enter user')
        ),

    async execute (client, interaction) {
        let embed
        let user = interaction.options.getUser('user')

        if (user) {
            let economyObj = await economy.findOne({userId: user.id})
            if (!economyObj) {
                economyObj = new economy({userId: user.id, Coins: 0})
                await economyObj.save()
            } 
    
            let coins = economyObj.Coins
    
            embed = new EmbedBuilder()
                .setTitle(`${user.globalName}'s balance`)
                .setDescription(`${coins} coins`)
                .setColor('Green')
        } else {
            let economyObj = await economy.findOne({userId: interaction.user.id})
                
            if (!economyObj) {
                economyObj = new economy({userId: interaction.user.id, Coins: 0})
                await economyObj.save()
            } 
    
            let coins = economyObj.Coins
    
            embed = new EmbedBuilder()
                .setTitle(`${interaction.user.globalName}'s balance`)
                .setDescription(`${coins} coins`)
                .setColor('Green')
            
        }

        interaction.reply({embeds: [embed]})
    }
}
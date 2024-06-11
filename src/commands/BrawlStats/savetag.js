const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const playerTag = require('../../models/tags')

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`savetag`)
        .setDescription('This command saves your playertag')
        .addStringOption(option => option
            .setName('playertag')
            .setDescription('Enter player tag')
            .setRequired(true)
    ),

    async execute(client, interaction) {

        let tag = interaction.options.getString('playertag')
        if (tag.startsWith('#')) {tag = tag.replace('#','')}

        let taggy = await playerTag.findOne({userId: interaction.user.id})

        if (!taggy) {
            taggy = new playerTag({userId: interaction.user.id, thugger: tag})
            await taggy.save()
        } else {
            taggy.thugger = tag
            await taggy.save()
        }

        embed = new EmbedBuilder()
            .setTitle(`Player tag saved successfully!`)
            .setColor('#252850'),

        interaction.reply({embeds: [embed]})
        

    }


}

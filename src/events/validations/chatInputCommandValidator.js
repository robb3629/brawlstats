const {EmbedBuilder} = require('discord.js')
const {devserverId, devs} = require('../../config.json')
const nConfig = require('../../messageConfig.json')
const getLocalCommands = require('../../oreo/getLocalCommands')

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand) reuturn

    const localCommands = getLocalCommands()
    const commandObject = localCommands.find((cmd) => cmd.data.name === interaction.commandName)

    if (!commandObject) return
    
    const createEmbed = (color, description) =>
        new EmbedBuilder().setColor(color).setDescription(description)

    if (commandObject.devOnly && interaction.guild.id !== devserverId) {
        const rEmbed = createEmbed(nConfig.embedColorError, nConfig.commandTestMode)
        return interaction.reply({ embeds: [rEmbed], ephemeral: true})
    }

    for (const permission of commandObject.userPermissions || []) {
        if (!interaction.member.permissions.has(permission)) {
            const rEmbed = createEmbed(nConfig.embedColorError,nConfig.userNoPermissions)
            return interaction.reply({embeds: [rEmbed], ephemeral: true})
        }
    }

    const bot = interaction.guild.members.me 
    for (const permission of commandObject.botPermissions || []) {
        if (!bot.permissions.has(permission)) {
            const rEmbed = createEmbed(nConfig.embedColorError,nConfig.botNoPermissions)
            return interaction.reply({embeds: [rEmbed], ephemeral: true})
        }

        try {
            await commandObject.run(client, interaction)
        } catch (error) {
            console.log(`An errore occurred insile the command validator: ${error}`)
        }
    }
}
const {devserverId, devs} = require("../../config.json")
const getLocalCommands = require("../../oreo/getLocalCommands")




module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return   
    const localCommands = getLocalCommands()

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if (!commandObject) return

        if (commandObject.devonly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: `You can't run this command`,
                    ephemeral: true
                })
                return
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === devserverId)) {
                interaction.reply({
                    content: `You can't run this command here`,
                    ephemeral: true
                })
                return
            }
        }

            if (commandObject.permissionsRequired?.lenght) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({
                            content: "You don't have the required permissions",
                            ephemeral: true,
                        })
                        return
                    }
                }
            }

            if (commandObject.botPermissions?.lenght) {
                for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me 
                    if (!bot.permissions.has(permission)) {
                        interaction.reply({
                            content:`I don't have enough permissions`,
                            ephemeral: true,
                        })
                        return
                    }
                }
            }

            await commandObject.callback(client, interaction)


        
    } catch (error) {
        console.log(`There was an error while executing the command: ${error}`)
    }
}
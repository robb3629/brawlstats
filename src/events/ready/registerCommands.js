const {devserverId} = require("../../config.json")
const commandComparing = require("../../oreo/commandComparing")
const getApplicationCommands = require("../../oreo/getApplicationCommands")
const getLocalCommands = require("../../oreo/getLocalCommands")

module.exports = async (client) => {
    try {
        const [localCommands, applicationCommands] = await Promise.all(getLocalCommands(), getApplicationCommands(client, devserverId))

        for (const localCommand of localCommands) {
            const {data, deleted} = localCommand;
            const {name: commandName, description: commandDescription, options: commandOptions} = data

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === commandName
            )

            if (deleted) {
                if (existingCommand) {
                    await applicationCommands.delete(existingCommand.id)
                    console.log(`Application command ${commandName} deleted`)
                } else {
                    console.log(`Application command ${commandName} was skipped since already deleted`)
                }
            } else if (existingCommand) {
                if (commandComparing(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {name: commandName, description: commandDescription, options: commandOptions})
                    console.log(`Apllication command ${commandName} has been edited`)
                }
            } else {
                await applicationCommands.create({name: commandName, description: commandDescription, options: commandOptions})
                console.log(`Application command ${commandName} was created`)
            }
        }

    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}
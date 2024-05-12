const {devserverId} = require("../../config.json")
const commandComparing = require("../../oreo/commandComparing")
const getAllFiles = require("../../oreo/getAllFiles")
const getApplicationCommands = require("../../oreo/getApplicationCommands")
const getLocalCommands = require("../../oreo/getLocalCommands")

module.exports = async (client) => {

    try {
        const localCommands = getLocalCommands()
        const applicationCommands = await getApplicationCommands(client, devserverId)

        for (const localCommand of localCommands) {
            const {name, description, options} = localCommand

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )
            
            if (existingCommand) {
                if (localCommand.deleted) {
                    console.log(`Command ${name} deleted`)
                    await applicationCommands.delete(existingCommand.id)
                    continue
                }

                if (commandComparing(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {description, options})
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Command ${name} is set to deleted`)
                }


                await applicationCommands.create({name, description, options})
                console.log(`Command ${name} was registered`)
            }
        }


    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}
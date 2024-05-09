const path = require('path')
const getAllFiles = require('../oreo/getAllFiles')

module.exports  = (client) => {
    const eventsFolder = getAllFiles(path.join(__dirname, '..', 'events'), true)

    for (const eventFolder of eventsFolder) {
        const eventFiles = getAllFiles(eventFolder)
        let eventName

        eventName = eventFolder.replace(/\\/g,'/').split('/').pop()

        console.log(eventName)

        eventName === 'validations' ? (eventName = 'interactionCreate') : eventName

        client.on(eventName, async(arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction  = require(eventFile)
                await eventFunction(client,arg)
            }
        })
    }
}
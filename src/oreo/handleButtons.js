const fs = require('fs')

module.exports = (client) => {
    client.handleButtons = async () => {
        const buttonsFolders = fs.readdirSync('../buttons')
        for (const folder of buttonsFolders) {
            const buttonFiles = fs.readdirSync(`../buttons/${folder}`).filter(file => file.endsWith('.js'))
            for (const file of buttonFiles) {
                const button = require(`../buttons/${folder}/${file}`)
                client.buttons.set(button.data.name, button)
            }
        }
    }
}
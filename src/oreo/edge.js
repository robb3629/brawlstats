const { API_KEY } = require("../config.json");
const {EmbedBuilder} = require('discord.js')

module.exports = async (playertag, interaction) => {
    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playertag}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        const gattino = await response.json();

        if (!response.ok) {
            const embed = new EmbedBuilder()
                .setTitle(`Couldn't execute command.`)
                .setDescription(`Invalid player tag was given`)
                .setColor('#ffb6c1')
            await interaction.reply({embeds : [embed]})
            console.log(`%c Error. Response: ${response}', 'color: #ff0000`)
            return; // Exit function if there's an error response
        }

        return gattino;
    } catch (error) {
        console.log(`There was an error: ${error}`);
        return null; // Return null if there's an error
    }
};

const { API_KEY } = require("../config.json");

module.exports = async (url, interaction) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            await interaction.reply(`Response error: ${response.status}`);
            return; // Exit function if there's an error response
        }

        const gattino = await response.json();
        return gattino;
    } catch (error) {
        console.log(`There was an error: ${error}`);
        return null; // Return null if there's an error
    }
};

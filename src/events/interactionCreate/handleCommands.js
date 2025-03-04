module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.log(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.log(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
};
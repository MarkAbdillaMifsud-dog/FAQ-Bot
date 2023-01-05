const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cannot_speak")
		.setDescription('Informs user to follow verification steps'),
	async execute(interaction) {
		await interaction.reply(`You must be Verified to take part in conversation on the Conflict of Nations server. To get verified, you need to follow the instructions given by the CounterBot user, to you, found in your direct messages on Discord.`);
        await interaction.reply(`Fore more information, check #faq-and-roles.`);
	},
};
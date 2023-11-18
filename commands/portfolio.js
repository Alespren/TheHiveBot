const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('portfolio')
		.setDescription('Create a new portfolio entry')
		.addStringOption((option) =>
			option
				.setName('date')
				.setDescription('The date that the meeting took place.')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('team_members')
				.setDescription('The names of each team member present.')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('mentors')
				.setDescription('The names of each mentor present.')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.reply('Pong!')
	},
}

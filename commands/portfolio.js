const {
	SlashCommandBuilder,
	ActionRowBuilder,
	Events,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require('discord.js')

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
	async autocomplete(interaction) {
		/*
			CURRENTLY UNUSED
		*/

		const focusedValue = interaction.options.getFocused().toLowerCase()
		const choices = ['Ashley', 'Robbie', 'Tanner', 'Dizire', 'Mayank', 'Robert']

		if (focusedValue == '') {
			await interaction.respond([
				{
					name: choices.join(', '),
					value: choices.join(', '),
				},
			])
		} else {
			const filtered = choices.filter((choice) => {
				const arr = formatFocusedValue(focusedValue).toLowerCase().split(', ')
				return choice.toLowerCase().startsWith(arr[arr.length - 1])
			})

			console.log(formatFocusedValue(focusedValue))
			console.log(filtered)

			await interaction.respond(
				filtered.map((choice) => ({ name: choice, value: choice }))
			)
		}
	},
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('portfolioEntryModal')
			.setTitle('Portfolio Entry')

		// Add components to modal

		// Create the text input components
		const tasksInput1 = new TextInputBuilder()
			.setCustomId('tasksInput1')
			.setLabel('What tasks did you complete this meeting?')
			.setStyle(TextInputStyle.Paragraph)

		const nextStepsInput1 = new TextInputBuilder()
			.setCustomId('nextStepsInput1')
			.setLabel('Any reflections or next steps?')
			.setStyle(TextInputStyle.Paragraph)

		const tasksInput2 = new TextInputBuilder()
			.setCustomId('tasksInput2')
			.setLabel('What tasks did you complete this meeting?')
			.setStyle(TextInputStyle.Paragraph)

		const nextStepsInput2 = new TextInputBuilder()
			.setCustomId('nextStepsInput2')
			.setLabel('Any reflections or next steps?')
			.setStyle(TextInputStyle.Paragraph)

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(tasksInput1)
		const secondActionRow = new ActionRowBuilder().addComponents(
			nextStepsInput1
		)
		const thirdActionRow = new ActionRowBuilder().addComponents(tasksInput2)
		const fourthActionRow = new ActionRowBuilder().addComponents(
			nextStepsInput2
		)

		// Add inputs to the modal
		modal.addComponents(
			firstActionRow,
			secondActionRow,
			thirdActionRow,
			fourthActionRow
		)

		// Show the modal to the user
		await interaction.showModal(modal)
	},
}

function formatFocusedValue(str) {
	const arr = str.replace(/,/g, ' ').split(' ')
	return capitalizeEachWord(arr.join(', ').replace(/, , /g, ', '))
}

function capitalizeEachWord(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

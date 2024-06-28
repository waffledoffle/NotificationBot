const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'addtask',
    description: 'Adds a task to the database',
    options: [
        {
            name: 'taskname',
            description: 'The name of the task',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'tasktype',
            description: 'The type of task either once, daily or weekly',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'once',
                    value: 'once',
                },
                {
                    name: 'daily',
                    value: 'daily',
                },
                {
                    name: 'weekly',
                    value: 'weekly',
                },
            ],
            required: true,
        },
        {
            name: 'deadline',
            description: 'The time a task has to be completed by',
            type: ApplicationCommandOptionType.String,
        },
        
    ],

    callback: (client, interaction) => {
        const name = interaction.options.get('taskname').value;
        const type = interaction.options.get('tasktype').value;
        const deadline = interaction.options.get('deadline')?.value || 'No deadline specified';
        const taskEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${name}`)
            .addFields(
                {
                    name: 'Type',
                    value: `${type}`,
                    inline: true,
                },
                {
                    name: 'Deadline',
                    value: `${deadline}`,
                    inline: true,
                },
            )
            .setTimestamp()
            .setFooter({ text: 'You got meowed on' });
        console.log(` ${name} ${type} ${deadline}`);
        interaction.reply({ embeds: [taskEmbed], ephemeral: true });
    },
};
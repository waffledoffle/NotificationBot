const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Task = require('../../models/task');

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

    callback: async (client, interaction) => {
        try {
            const name = interaction.options.get('taskname').value;
            const type = interaction.options.get('tasktype').value;
            const deadline = interaction.options.get('deadline')?.value || null;

            const newTask = new Task({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
                taskName: name,
                taskType: type,
                taskDeadline: deadline

            })


            await newTask.save();
            
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
                        value: `${deadline || 'No deadline specified'}`,
                        inline: true,
                    },
                )
                .setTimestamp()
                .setFooter({ text: 'You got meowed on' });

            interaction.reply({ embeds: [taskEmbed], ephemeral: true });   
        } catch (error) {
            interaction.reply(`Error creating task: ${error}`);
        }
    },
};
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Task = require('../../models/task');

module.exports = {
    name: 'updatetask',
    description: 'Finds a task and updates it with values the user provides',
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
        },
        {
            name: 'location',
            description: 'The location this task needs to be completed at',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'deadline',
            description: 'The time a task has to be completed by',
            type: ApplicationCommandOptionType.String,
        },
    ],
    callback: async (client, interaction) => {
        try {
            const taskName = interaction.options.get('taskname').value;
            const taskType = interaction.options.get('tasktype')?.value || null;
            const taskLocation = interaction.options.get('location')?.value || null;
            const taskDeadline = interaction.options.get('deadline')?.value || null;
            const userId = interaction.user.id;

            let foundTask = await Task.findOne({userId, taskName});

            if (!foundTask) {
                interaction.reply({ content: `No task found with name: ${taskName}`, epehemeral: true });
                return;
            }

            if (taskType) {
                foundTask.taskType = taskType;
            }
            if (taskLocation) {
                foundTask.taskLocation = taskLocation
            }
            if (taskDeadline) {
                foundTask.taskDeadline = taskDeadline;
            }

            await foundTask.save();

            const taskEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Task updated:')
                .setDescription(`${taskName}`)
                .setThumbnail('https://i.imgur.com/YprbQRM.png')
                .addFields(
                    {
                        name: '\u200B',
                        value: '\u200B'
                    },
                    {
                        name: 'New Type',
                        value: `${taskType || 'No change in type'}`,
                        inline: true,
                    },
                    {
                        name: 'New Location',
                        value: `${taskLocation || 'No change in location'}`,
                        inline: true,
                    },
                    {
                        name: 'New Deadline',
                        value: `${taskDeadline || 'No change in deadline'}`,
                        inline: true,
                    },
                )
                .setImage('https://i.imgur.com/fx5RFJ0.jpeg')
                .setTimestamp()
                .setFooter({ text: 'You got meowed on NERD' });

            interaction.reply({ embeds: [taskEmbed], ephemeral: true });   
        } catch (error) {
            interaction.reply({ content: `Error updating task: ${error}`, ephemeral: true });
        }
    }

}
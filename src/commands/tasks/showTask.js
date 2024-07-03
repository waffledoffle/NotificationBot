const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Task = require('../../models/task');

module.exports = {
    name: 'showtasks',
    description: 'Gives you a list of tasks that need to be completed',
    options: [
        {
            name: 'showtasktype',
            description: 'Which type of tasks should be listed: once, daily, weekly, or all tasks',
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
                {
                    name: 'all',
                    value: 'all',
                },
            ],
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        try {
            const taskType = interaction.options.getString('showtasktype');
            const userId = interaction.user.id;

            let allTasks;

            if (taskType === 'all') {
                allTasks = await Task.find({ userId }); 
            }
            else {
                allTasks = await Task.find({ userId, taskType });
            }

            var text = '';

            for (const task of allTasks) {
                text += `**Task:** ${task.taskName}\n**Task Type:** ${task.taskType}\n**Task Location:** ${task.taskLocation || 'No location specified'}\n**Task Deadline:**  ${task.taskDeadline || 'No deadline specified'}
                ----------------------------------\n`;
            }

            const tasksEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`${interaction.options.get('showtasktype').value} tasks for ${interaction.user.username}`)
                .setDescription(text || '**NO TASKS HOW ABOUT BEING PRODUCTIVE NERD**')
                .setImage('https://i.imgur.com/fx5RFJ0.jpeg')
                .setTimestamp()
                .setFooter({ text: 'You got meowed on NERD' });

            interaction.reply({ embeds: [tasksEmbed], ephemeral: true });   
        } catch (error) {
            console.log(error);
            interaction.reply({ content: `Error finding tasks: ${error}`, ephemeral: true });
        }
    },
};
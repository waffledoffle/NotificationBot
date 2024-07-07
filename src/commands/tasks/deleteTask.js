const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Task = require('../../models/task');

module.exports = {
    name: 'deletetask',
    description: 'Finds a task and deletes it from the database',
    options: [
        {
            name: 'taskname',
            description: 'The name of the task',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        try {
            const taskName = interaction.options.get('taskname').value;
            const userId = interaction.user.id;

            let deletedTask = await Task.deleteOne({userId, taskName});

            if (!deletedTask) {
                interaction.reply({ content: `No task found with name: ${taskName}`, epehemeral: true });
                return;
            }

            const taskEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Task Removed:')
                .setDescription(`${taskName}`)
                .setThumbnail('https://i.imgur.com/YprbQRM.png')
                .setImage('https://i.imgur.com/fx5RFJ0.jpeg')
                .setTimestamp()
                .setFooter({ text: 'You got meowed on NERD' });

            interaction.reply({ embeds: [taskEmbed], ephemeral: true });   
        } catch (error) {
            interaction.reply({ content: `Error deleting task: ${error}`, ephemeral: true });
        }
    }
}
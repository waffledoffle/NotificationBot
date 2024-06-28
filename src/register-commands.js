require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
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
            
        ]
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
console.log('meow');
(async () => {
    try {
        console.log('starting command register')
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Commands were registered succesfully');
    } catch (error) {
        console.log(`there was an error: ${error}`);
    }
})();
const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

//This function will register new commands found and edit pre existing commands
module.exports = async (client) => { 

    try {
        //Gets both local and global or guild commands
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);
        
        //For every localCommand store the name, descirption, and options
        for (const localCommand of localCommands) {
            const {name, description, options } = localCommand;

            //find if there is an existing command with the same name as the localCommand
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            
            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command "${name}"`);
                }
            }
            else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it is set to delete`);
                    continue;
                }
                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`registered command "${name}"`);
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
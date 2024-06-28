const path = require('path');
const getAllFiles = require('./getAllFiles');

//This function returns all commands the discord bot will be allowed to run
module.exports = (exceptions) => {
    let localCommands = [];


    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    //For every category (folder) of commands that have been defined gets a list of the files contained in these folders
    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        //For every file found in a folder create a commandObject and add it to the localCommands array
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);
            localCommands.push(commandObject);
        }
    }
    return localCommands;
}
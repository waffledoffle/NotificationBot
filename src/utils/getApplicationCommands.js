module.exports = async (client, guildId) => {
    let applicationCommands;

    //If a guildID has been provided
    if (guildId) {
        //Get a guild object from the discordAPI
        const guild = await client.guilds.fetch(guildId);
        //Get the commads manager of the guild and assign it to the applicationCommands
        applicationCommands = guild.commands;
    } else {
        //Otherwise fetch the global application commands manager and assign it
        applicationCommands = await client.application.commands;
    }
    //Fetches the commands from the manager
    await applicationCommands.fetch();
    return applicationCommands;
};
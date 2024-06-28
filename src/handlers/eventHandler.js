const path = require('path');
const getAllFiles = require("../utils/getAllFiles")


module.exports = (client) => {
    
    //Gets all folders within the events directory
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);
    
    //For every folder we put all the files within that folder into an array
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);

        //Sorts the files within the array so that certain files can be accessed first
        eventFiles.sort((a, b) => a > b);

        //Replaces any backslashes with forward slashes before splitting the name into an array by forward slashes. We then get the last element which is the name of the file
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        //Listens for the event stored in event name
        client.on(eventName, async (arg) => {
            //For every file in the array it imports the module specific to that file
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                //Awaits for the function to complete before moving onto the next iteration
                await eventFunction(client, arg);
            }
        })
    }
}
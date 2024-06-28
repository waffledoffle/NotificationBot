const fs = require('fs');
const path = require('path');

//This method returns all file names or all folder names
module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    //This is a list of dirent Objects containing data about all the files within a directory
    const files = fs.readdirSync(directory, { withFileTypes: true });

    //For each object create a filePath by joining the directory to the front of the file name
    for (const file of files) {
        const filePath = path.join(directory, file.name);

        //If foldersOnly is true then if the file is a directory add it to the fileNames array
        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        }
        else { //If foldersOnly is false and the file is a file add it to the fileNames array
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }
    return fileNames;
};

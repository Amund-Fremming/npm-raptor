const generateDontetProject = require("./functions/CLICommands");
const CLIHandler = require("./functions/CLIHandler");
const generateFolders = require("./functions/FolderHandler");
const generateFiles = require("./functions/FileHandler");

async function main() {
  try {
    await generateDontetProject();

    const handler = new CLIHandler();
    await handler.startCLI();

    console.log("Finishing build ...");

    await generateFolders(handler.getUserInput());
    await generateFiles(handler.getUserInput());
  } catch (error) {
    console.error(error);
  }
}

main();

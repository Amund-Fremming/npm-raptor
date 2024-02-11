const GenerateDontetProject = require("./functions/CLICommands");
const CLIHandler = require("./functions/CLIHandler");
const GenerateFolders = require("./functions/FolderHandler");

async function main() {
  try {
    await GenerateDontetProject();

    const handler = new CLIHandler();
    await handler.startCLI();

    await GenerateFolders(handler.getUserInput());
  } catch (error) {
    console.error(
      "An error occurred, check if its already a project named RaptorProject in you dir."
    );
  }
}

main();

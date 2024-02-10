const CLIHandler = require("./functions/CLIHandler");

async function main() {
  const handler = new CLIHandler();
  await handler.startCLI();

  console.log("Your models: " + handler.getUserInput());
}

main();

#!/usr/bin/env node

// Parse command-line arguments
const args = process.argv.slice(2);

// Implement your CLI logic here
if (args.includes("start")) {
  // Run the start script from your package
  require("./main.js");
} else {
  console.log("Usage: dotnet-raptor <command>");
}

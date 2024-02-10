const fs = require("fs");
const { exec } = require("child_process");
const readline = require("readline");

const input = [];

// Takes input from command line and waits for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      if (answer === "error") {
        reject(new Error("An error occurred with the input"));
      } else {
        resolve(answer);
      }
    });
  });
}

async function main() {
  const nameOne = await question("Hva heter du? ");
  input.push(nameOne);
  const nameTwo = await question("Hva heter du? ");
  input.push(nameTwo);
  const nameThree = await question("Hva heter du? ");
  input.push(nameThree);

  rl.close();

  // Folder creation
  fs.mkdir("./folder", { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log("Dir created!");
  });

  // File creation
  fs.writeFile("./folder/file.txt", "Hello, world!", (err) => {
    if (err) {
      return console.error(err);
    }

    console.log("File created!");
  });

  // Command line execution
  exec("ls", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stdout: ${stderr}`);
      return;
    }
  });

  // File writer with writestream
  const writeStream = fs.createWriteStream("./folder/file.txt");

  const data = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];

  data.forEach((el, index) => {
    if (index !== 0 && index % 3 === 0) {
      writeStream.write("\n");
    }
    if (index < 3) {
      writeStream.write(el);
      writeStream.write(" ");
    }

    if (index >= 3 && index < 6) {
      writeStream.write(el);
      writeStream.write(" ");
    }

    if (index >= 6 && index < 9) {
      writeStream.write(el);
      writeStream.write(" ");
    }
  });

  writeStream.end();

  writeStream.on("error", (err) => {
    console.error("Error while writing!");
  });

  console.log("her!");
  input.forEach((el) => {
    console.log(el);
  });
}

// Init
main();

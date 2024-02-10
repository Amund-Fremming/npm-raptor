const fs = require("fs");
const { exec } = require("child_process");

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

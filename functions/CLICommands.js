const { exec } = require("child_process");

function GenerateDontetProject() {
  console.log("Generating base ...");

  return new Promise((resolve, reject) => {
    exec("dotnet new webapi -n RaptorProject", (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      if (stderr) {
        reject(stderr);
      }

      resolve(stdout);
    });
  });
}

module.exports = GenerateDontetProject;

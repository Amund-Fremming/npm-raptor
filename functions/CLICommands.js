const { exec } = require("child_process");

function GenerateDontetProject() {
  console.log("Generating base ...");

  return new Promise((resolve, reject) => {
    exec("rm -rf RaptorProject");

    exec("dotnet new webapi -n RaptorProject", (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      if (stderr) {
        reject(stderr);
      }

      // Installs NuGet packages
      const command = `
        cd RaptorProject &&
        dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL &&
        dotnet add package Microsoft.EntityFrameworkCore.Design &&
        dotnet add package Swashbuckle.AspNetCore
      `;
      exec(command);

      // Removes the Program.cs so we can create our own
      exec("cd RaptorProject && rm -rf Program.cs");

      resolve(stdout);
    });
  });
}

module.exports = GenerateDontetProject;

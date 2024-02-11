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

      const command = `
        cd RaptorProject &&
        dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL &&
        dotnet add package Microsoft.EntityFrameworkCore.Design &&
        dotnet add package Swashbuckle.AspNetCore
      `;

      exec(command);

      resolve(stdout);
    });
  });
}

module.exports = GenerateDontetProject;

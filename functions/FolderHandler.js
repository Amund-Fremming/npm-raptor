const fs = require("fs");

function generateFolders(modelNames) {
  const folderPromises = modelNames.map((model) => createFolder(model));
  folderPromises.push(createFolder("Data"));

  return Promise.all(folderPromises);
}

const PATH_BASE = "./RaptorProject";
function createFolder(name) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${PATH_BASE}/${name}`, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(name);
      }
    });
  });
}

module.exports = generateFolders;

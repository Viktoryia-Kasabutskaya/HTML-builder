/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(secretFolder, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats: ${err.message}`);
          return;
        }

        const fileName = path.basename(file.name, path.extname(file.name));
        const fileExt = path.extname(file.name).slice(1);
        const fileSize = (stats.size / 1024).toFixed(2);

        console.log(`${fileName} - ${fileExt} - ${fileSize} KB`);
      });
    }
  });
});

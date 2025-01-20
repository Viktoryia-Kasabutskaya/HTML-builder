/* eslint-disable prettier/prettier */
const fs = require('fs').promises;
const path = require('path');

const sourceFolder = path.resolve(__dirname, 'files');
const destinationFolder = path.resolve(__dirname, 'files-copy');

async function copyFolder() {
  try {
    await fs.rm(destinationFolder, { recursive: true, force: true });
    await fs.mkdir(destinationFolder, { recursive: true });

    const files = await fs.readdir(sourceFolder);

    for (const file of files) {
      const sourcePath = path.join(sourceFolder, file);
      const destinationPath = path.join(destinationFolder, file);
      await fs.copyFile(sourcePath, destinationPath);
      console.log(`File "${file}" copied successfully.`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

copyFolder();

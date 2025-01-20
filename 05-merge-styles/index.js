/* eslint-disable prettier/prettier */
const fs = require('fs').promises;
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {
  try {
    await fs.rm(bundlePath, { force: true });

    const files = await fs.readdir(stylesFolder);
    const cssFiles = files.filter(file => path.extname(file) === '.css');

    for (const file of cssFiles) {
      const filePath = path.join(stylesFolder, file);
      const content = await fs.readFile(filePath, 'utf-8');
      await fs.appendFile(bundlePath, content);
    }

    console.log('CSS bundle created successfully.');
  } catch (err) {
    console.error(`Error creating CSS bundle: ${err.message}`);
  }
}

createBundle();

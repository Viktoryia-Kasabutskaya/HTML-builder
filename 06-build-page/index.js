/* eslint-disable prettier/prettier */
const fs = require('fs').promises;
const path = require('path');

const projectDist = path.resolve(__dirname, 'project-dist');
const assetsSrc = path.resolve(__dirname, 'assets');
const assetsDest = path.join(projectDist, 'assets');
const stylesDir = path.resolve(__dirname, 'styles');
const componentsDir = path.resolve(__dirname, 'components');
const templatePath = path.resolve(__dirname, 'template.html');
const indexPath = path.join(projectDist, 'index.html');
const bundlePath = path.join(projectDist, 'style.css');

async function createFolder(folderPath) {
  await fs.mkdir(folderPath, { recursive: true });
}

async function copyFolder(src, dest) {
  await createFolder(dest);
  const items = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    items.map(async item => {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);

      if (item.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    })
  );
}

async function bundleStyles() {
  const files = await fs.readdir(stylesDir);
  const cssFiles = files.filter(file => path.extname(file) === '.css');

  const styles = await Promise.all(
    cssFiles.map(file => fs.readFile(path.join(stylesDir, file), 'utf-8'))
  );

  await fs.writeFile(bundlePath, styles.join('\n'));
}

async function buildHtml() {
  let template = await fs.readFile(templatePath, 'utf-8');
  const components = await fs.readdir(componentsDir);

  for (const file of components) {
    if (path.extname(file) === '.html') {
      const componentName = path.basename(file, '.html');
      const componentContent = await fs.readFile(
        path.join(componentsDir, file),
        'utf-8'
      );
      template = template.replaceAll(`{{${componentName}}}`, componentContent);
    }
  }

  await fs.writeFile(indexPath, template);
}

async function buildProject() {
  try {
    await fs.rm(projectDist, { recursive: true, force: true });
    await createFolder(projectDist);
    await copyFolder(assetsSrc, assetsDest);
    await bundleStyles();
    await buildHtml();
    console.log('Project built successfully!');
  } catch (err) {
    console.error(`Error during build: ${err.message}`);
  }
}

buildProject();

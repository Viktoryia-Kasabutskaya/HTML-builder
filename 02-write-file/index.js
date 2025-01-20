/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

process.stdout.write('Please enter your text:\n');

const file = path.join(__dirname, 'output.txt');
const fileStream = fs.createWriteStream(file);

stdin.on('data', (data) => {
  const enteredText = data.toString().trim();
  if (enteredText.toLowerCase() === 'exit') {
    close();
  } else {
    fileStream.write(`${enteredText}\n`);
  }
});

function close() {
  stdout.write('\nGoodbye!');
  process.exit();
}

process.on('SIGINT', close);

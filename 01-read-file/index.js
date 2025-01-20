/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const streamRead = fs.createReadStream(file, 'utf-8');

streamRead.on('data', (include) => console.log(include.toString()));

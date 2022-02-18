const fs = require('fs');

function log(fileName, content) {
  fs.writeFile(`${DIRNAME}/__dist__/${fileName}`, content, 'utf-8', () => {});
}

module.exports = log;
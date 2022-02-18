const fs = require('fs');
const translator = require('./cpp-parser/translator');

global.DIRNAME = __dirname.split('/').slice(0, -1).join('/');
const DIRNAME_SRC = `${DIRNAME}/__dist__/src`;

const args = process.argv.slice(2);

const source = {
  path: args[0],
  file: null
}

function save(output) {
  for(const [fileName, code] of Object.entries(output)) {
    const filePath = fileName.split('/').slice(0,-1).join('/');

    fs.mkdirSync(`${DIRNAME_SRC}/${filePath}`, { recursive: true });

    fs.writeFile(`${DIRNAME_SRC}/${fileName}`, code, 'utf-8', () => {});
  }
}

function main() {
  fs.mkdirSync(DIRNAME_SRC, { recursive: true });

  source.file = fs.readFileSync(source.path, 'utf-8');

  const output = translator.translate(source.file);

  save(output);
}

main();

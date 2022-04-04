import fs from 'fs';

export default function log(fileName, content) {
  fs.writeFile(`${global.DIRNAME}/__dist__/${fileName}`, content, 'utf-8', () => {});
}

const log = require('../../helpers/log');
const parser = require('../parser');
const ast = require('../parser/ast');
const { Parser: AcornParser } = require("acorn");
const convert = require('./converter');

function translate(sourceCode) {
  const parsedCode = parser.parse(sourceCode);
  log('parsed-code.json', JSON.stringify(parsedCode, null, 2));
  

  const astCode = AcornParser.parse(sourceCode)
  // const astCode = ast.make(parsedCode.tokens)
  log('ast-code.json', JSON.stringify(astCode, null, 2));

  const output = convert(astCode);

  return output;
}

module.exports = {
  translate
};
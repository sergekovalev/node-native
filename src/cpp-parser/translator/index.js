const log = require('../../helpers/log');
const parser = require('../parser');
const cppAst = require('../parser/cpp-ast');
const { Parser: AcornParser } = require("acorn");
const convert = require('./converter');

function translate(sourceCode) {
  const parsedCode = parser.parse(sourceCode);
  log('parsed-code.json', JSON.stringify(parsedCode, null, 2));
  

  const jsAstCode = AcornParser.parse(sourceCode)
  log('js-ast-code.json', JSON.stringify(jsAstCode, null, 2));

  const cppAstCode = cppAst.make(jsAstCode)
  log('cpp-ast-code.json', JSON.stringify(cppAstCode, null, 2));

  const output = convert(cppAstCode);

  return output;
}

module.exports = {
  translate
};
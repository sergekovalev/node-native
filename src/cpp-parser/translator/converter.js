const tokenizer = require('../../helpers/tokenizer');
const collect = require('../../helpers/collect');

const MAIN_FUNC_TEMPLATE = require('./templates/main_func');

const struct = {
  'main.cpp': ''
}

const includesList = [];

function generateContent(ast) { 
  includesList.push('stdio.h')

  return '';
}

function convert(ast) {
  const mainContent = generateContent(ast);

  struct['main.cpp'] = tokenizer(
    MAIN_FUNC_TEMPLATE,
    {
      includes: collect.includes(includesList),
      mainContent
    }
  );

  return struct;
}

module.exports = convert;
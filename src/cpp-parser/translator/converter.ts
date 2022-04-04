import tokenizer from '../../helpers/tokenizer';
import { includes } from '../../helpers/collect';

import MAIN_FUNC_TEMPLATE from './templates/main_func';

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
      includes: includes(includesList),
      mainContent
    }
  );

  return struct;
}

export default convert;

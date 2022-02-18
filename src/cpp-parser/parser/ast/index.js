const log = require('../../../helpers/log');
const parser = require('..');
const TOKENS = require('../tokens');

const tree = {
  type: 'program',
  body: []
}

const addNode = () => {

}

const createNode = (tokens, i) => {

}

const make = (tokens) => {
  let i = 0;

  while(tokens[i]) {
    switch(tokens[i]) {
      case TOKENS.VARIABLE_DECLARATION:
        tree.body.push({
          type: TOKENS.VARIABLE_DECLARATION,
          declarations: [
            {
              name: tokens[i+1]
            }
          ]
        })

        i++;

        break;
    }

    i++;
  }

  return tree;
}

module.exports = {
  make
};
const pairs = require('./pairs')

const mapToken = (ch) => {
  token = pairs[ch] || null
  
  if(token) {
    if(typeof token === 'object' && (token['before'] || token['after'])) {
      return token['before'] + ch + token['after'];
    }
    
    return token;
  }
  
  return [ch];
}

function tokenize(code) {
  let tokens = [];

  code.forEach(token => {
    tokens.push(...mapToken(token))
  });

  return tokens;
}

module.exports = {
  tokenize
};
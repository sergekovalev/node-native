import pairs from './pairs';

const mapToken = (ch) => {
  const token = pairs[ch] || null
  
  if(token) {
    if(typeof token === 'object' && (token['before'] || token['after'])) {
      return token['before'] + ch + token['after'];
    }
    
    return token;
  }
  
  return [ch];
}

export default function tokenize(code) {
  let tokens = [];

  code.forEach(token => {
    tokens.push(...mapToken(token))
  });

  return tokens;
}

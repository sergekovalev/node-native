const tokenizer = require('./tokenizer');

concatPairs = [
  ['='.charCodeAt(), '='.charCodeAt()],
  ['>'.charCodeAt(), '='.charCodeAt()],
  ['<'.charCodeAt(), '='.charCodeAt()],
  ['-'.charCodeAt(), '>'.charCodeAt()]
]

const CHAR_CODES = {
  NEW_LINE: '\n'.charCodeAt(),
  SPACE: ' '.charCodeAt(),
  SEMICOLON: ';'.charCodeAt(),
  A: 'A'.charCodeAt(),
  Z: 'Z'.charCodeAt(),
  a: 'a'.charCodeAt(),
  z: 'z'.charCodeAt(),
  0: '0'.charCodeAt(),
  9: '9'.charCodeAt(),
}

const parsedCode = [];

const isSpace = (charCode) =>
  charCode == CHAR_CODES.SPACE || charCode == CHAR_CODES.NEW_LINE;

const isEndl = (charCode) =>
  charCode == CHAR_CODES.NEW_LINE;

const isSign = (charCode) => {
  const isBigLetter = charCode >= CHAR_CODES.A && charCode <= CHAR_CODES.Z;
  const isSmallLetter = charCode >= CHAR_CODES.a && charCode <= CHAR_CODES.z;

  return !(isBigLetter || isSmallLetter);
}

const isNumber = (charCode) => charCode >= CHAR_CODES['0'] &&  charCode <= CHAR_CODES['9']

const canConcat = (charCode, previousCharCode) => {
  for(pair of concatPairs) {
    if(pair[0] == previousCharCode && pair[1] == charCode) {
      return True
    }
  }
  
  return false;
}

const push = (ch, charCode, previousCharCode) => {
  if(ch) {
    if(canConcat(charCode, previousCharCode)) {
      parsedCode[-1] += ch
    }
    else {
      parsedCode.push(ch)
    }
  }
}

const getParsedCode = (code) => {
  let word = '';
  let previousCharCode = null;
  let linesCount = 0;
  let ch = null;

  for(let i = 0; i < code.length; i++) {
    ch = code[i];
    charCode = ch.charCodeAt();
    
    if(isSign(charCode) && !isNumber(charCode)) {
      push(word, charCode, previousCharCode);
      
      word = '';
      
      if(!isSpace(charCode)) {
        push(ch, charCode, previousCharCode)
      }
      
      if(isEndl(charCode)) {
        linesCount += 1
        
        if(!isEndl(previousCharCode) && charCode != CHAR_CODES.SEMICOLON){ 
          push(CHAR_CODES.SEMICOLON, charCode, previousCharCode)
        }
      }
    } else {
      word += ch;
    }
    
    previousCharCode = charCode;
  }
  
  // infix_tokens = tokenize(parsedCode)
  
  return {
    linesCount,
    code: parsedCode,
    // 'tokens': null,
    // 'postfix_tokens': postfix(infix_tokens)
  }
}

function parse(code) {
  const parsedCode = getParsedCode(code);
  
  const tokenizedCode = tokenizer.tokenize(parsedCode.code);

  return {
    ...parsedCode,
    tokens: tokenizedCode,
  }
}

module.exports = {
  parse
};
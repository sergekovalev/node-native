import log from '../../helpers/log';
import parser from '../parser';
import cppAst from '../parser/cpp-ast';
import { Parser as AcornParser } from "acorn";
import convert from './converter';

export default class Translatator {
  private sourceCode: string;

  constructor(sourceCode: string) {
    this.sourceCode = sourceCode;
  }

  translate(): any {
    const parsedCode = parser(this.sourceCode);
    log('parsed-code.json', JSON.stringify(parsedCode, null, 2));

    const jsAstCode = AcornParser.parse(this.sourceCode, null);
    log('js-ast-code.json', JSON.stringify(jsAstCode, null, 2));

    const cppAstCode = cppAst(jsAstCode)
    log('cpp-ast-code.json', JSON.stringify(cppAstCode, null, 2));

    const output = convert(cppAstCode);

    return output;
  }
}
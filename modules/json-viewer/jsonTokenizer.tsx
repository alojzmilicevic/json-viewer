import { log } from "console";
import { isNum } from "../../util/util";

export type TokenType =
      'object-open'
    | 'object-close'
    | 'array-open'
    | 'array-close'
    | 'boolean'
    | 'number'
    | 'string'
    | 'variable'
    | 'key-value-separator'
    | 'white-space'
    | 'line-ending-comma';

export enum TokenTypes {
    objectOpen = 'object-open',
    objectClose = 'object-close',
    arrayOpen = 'array-open',
    arrayClose = 'array-close',
    boolean = 'boolean',
    number = 'number',
    string = 'string',
    variable = 'variable',
    keyValueSeparator = 'key-value-separator',
    whiteSpace = 'white-space',
    lineEndingComma = 'line-ending-comma',
}

const NO_VARIABLE = 'NO_VARIABLE';

export type Token = {
    value: string;
    type: TokenType;
}

export function tokenizeJson(data: any, tabSize = 4) {
    data = JSON.stringify(data, null, tabSize).split('\n');
    const result: Token[][] = [];

    data.forEach((line: any, i: number) => {
        const whiteSpaceCount = line.search(/\S/);
        const whiteSpaces = line.substring(0, whiteSpaceCount);
        const lineWithoutWhitespace = line.trim();
        const isLastLine = i === data.length - 1;

        const variableName = getVariableName(lineWithoutWhitespace);
        const rightSideToken = getRightSideToken(lineWithoutWhitespace);
        const tokens = buildTokenResult(variableName, rightSideToken, whiteSpaces, isLastLine);

        result.push(tokens);
    });

    return result;
}

/**
 * 
 * @param variableName the left side of the colon or NO_VARIABLE if there is no colon
 * @param token the right side of the colon or the whole line if there is no colon
 * @param whiteSpace the whitespace at the beginning of the line
 * @param isLastLine if the line is the last line in the json
 * @returns 
 */
function buildTokenResult(variableName: string, token: Token, whiteSpace: string, isLastLine: boolean): Token[] {
    const tokens: Token[] = [];

    tokens.push({ value: whiteSpace, type: TokenTypes.whiteSpace });

    if (variableName !== NO_VARIABLE) {
        tokens.push({ value: variableName, type: TokenTypes.variable });
        tokens.push({ value: ': ', type: TokenTypes.keyValueSeparator });
    }

    tokens.push(token);

    if (token.type !== TokenTypes.objectOpen
        && token.type !== TokenTypes.arrayOpen
        && !isLastLine
    ) {
        tokens.push({ value: ',', type: TokenTypes.lineEndingComma });
    }

    return tokens;
}

/**
 * 
 * @param line current json line without whitespace
 * @returns the right side of the colon in json or the whole line if there is no colon
 */
function getRightSideToken(line: string): Token {
    const value = line.substring(line.indexOf(':') + 1).trim().replace(',', '');
    let type = TokenTypes.string;

    switch (value) {
        case '{':
            type = TokenTypes.objectOpen;
            break;
        case '}':
            type = TokenTypes.objectClose;
            break;
        case '[':
            type = TokenTypes.arrayOpen;
            break;
        case ']':
            type = TokenTypes.arrayClose;
            break;
        case 'true':
        case 'True':
        case 'False':
        case 'false':
            type = TokenTypes.boolean;
            break;
    }

    if (isNum(value)) {
        type = TokenTypes.number;
    }

    return { value, type };
}

/**
 * 
 * @param line current json line without whitespace
 * @returns the left side of the colon, or NO_VARIABLE if there is no colon
 */
function getVariableName(line: string): string {
    const re = /[^"]+(?=\":)/g;
    const raw = re.exec(line);
    return raw ? raw[0] : NO_VARIABLE;
}

/**
 * 
 * @param rawData the raw json data
 * @returns all bracket and square bracket positions in the json
 */
export function generateBracketPairs(rawData: any, space = 4) {
    rawData = JSON.stringify(rawData, null, space);
    
    const stack: number[] = [];
    const data: number[] = [];
    let row = 0;

    for(let i = 0; i < rawData.length; i++) {
        const curChar = rawData[i];
        if (curChar === '{' || curChar === '[') {
            stack.push(row);
        } else if (curChar === '}' || curChar === ']') {
            const start = stack.pop() as number;
            data[start] = row;
        } else if (curChar === '\n') {
            row++;
            data[row] = -1;
        }
    }

    return data;
}
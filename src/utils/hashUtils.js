/* eslint-disable no-magic-numbers */
export const start = { symbol: '', position: '0' };
export const end = { symbol: '', position: '1' };
export const hashDelim = ',';
export const maxLettersSymbol = 2;

export function indexToPosition(index) {
    if (index === 0) return '2';
    if (index === 1) return '3';
    if (index <= 3) return '4';
    if (index <= 6) return '5';

    return '6';
}

export function toHash(token) {
    return `${token.symbol}${hashDelim}${token.position}`;
}

// export function fromHash(hash) {
//     const [ symbol, position ] = hash.split(hashDelim);

//     return { symbol, position };
// }

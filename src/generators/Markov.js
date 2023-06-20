import { start, end, indexToPosition, toHash, maxLettersSymbol  } from '../utils/hashUtils';
import { pickMap } from '../utils/pickUtils';

export default class Generator {
    constructor(model, safeLength = 1000) {
        this._model = model.matrix;
        this._safeLength = safeLength;
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    generate({ noJOIN = false } = {}) {
        const word = [];

        let map = this._model[toHash(start)];

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const nextSymbol = pickMap(map);

            if (nextSymbol === toHash(end)) break;

            const position = indexToPosition(word.length);
            const symbols = new Set();
            const hashes = [];

            for (let i = 0; i < maxLettersSymbol; i++) {
                if (word.length > i - 1) symbols.add(`${word.slice(-i).join('')}${nextSymbol}`);
            }

            for (const symbol of symbols) {
                hashes.push(toHash({ symbol, position }), symbol);
            }

            for (const hash of hashes) {
                map = this._model[hash];
                if (map) break;
            }

            word.push(nextSymbol);
            if (!map) break;
            if (word.length >= this._safeLength) break;
        }

        if (noJOIN) return word;

        return word.join('');
    }
}

import { start, end, indexToPosition, toHash, maxLettersSymbol  } from './utils/hashUtils';

function pickMap(map) {
    const rand = Math.random();

    let accum = 0;

    for (const token of Object.keys(map)) {
        const curr = map[token];

        accum += curr;
        if (rand < accum) return token;
    }
}

export default class Generator {
    constructor(model) {
        this._model = model.matrix;
    }

    generate() {
        const word = [];

        let map = this._model[toHash(start)];

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const nextSymbol = pickMap(map);

            if (nextSymbol === toHash(end)) break;

            const position = indexToPosition(word.length);
            const symbols = [];
            const hashes = [];

            for (let i = 0; i < maxLettersSymbol; i++) {
                if (word.length > i - 1) symbols.push(`${word.slice(-i).join('')}${nextSymbol}`);
            }

            for (const symbol of symbols) {
                hashes.push(toHash({ symbol, position }), symbol);
            }

            for (const hash of hashes) {
                map = this._model[hash];
                if (map) break;
            }

            word.push(nextSymbol);
        }

        return word.join('');
    }
}

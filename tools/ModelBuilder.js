/* eslint-disable no-param-reassign */
import { start, end, indexToPosition, toHash, maxLettersSymbol  } from '../src/utils/hashUtils';

const endHash = toHash(end);
const startHash = toHash(start);

export default class ModelBuilder {
    collectHashes(letter, sanitized, index) {
        if (letter === null) return [ startHash ];

        const hashes = [];
        const symbols = [];

        for (let limit = 0; limit < maxLettersSymbol; limit++) {
            const sliced = sanitized.slice(index - limit, index + 1).join('');

            if (sliced.length > 0) symbols.push(sliced);
        }

        for (const symbol of symbols) {
            hashes.push(
                symbol,
                toHash({
                    symbol,
                    position : indexToPosition(index)
                })
            );
        }

        return hashes;
    }

    sanitize(word, caseType) {
        if (caseType === 'LOWER') return word.toLowerCase();
        if (caseType === 'UPPER') return word.toUpperCase();

        return word;
    }

    getTokens(word, tokens) {
        return this.sanitize(word).split(tokens.delim);
    }

    buildMarkov(dataset, model, tokenConfig) {
        for (const item of dataset) {
            const { word, weight } = item;
            const sanitized = this.getTokens(word, tokenConfig);
            const array = [ null, ...sanitized ];

            for (let index = 0; index < array.length; index++) {
                const letter = array[index];
                const hashes = this.collectHashes(letter, sanitized, index - 1);

                for (const hash of hashes) {
                    let map = model[hash];

                    if (!map) {
                        map = {};
                        model[hash] = map;
                    }

                    const nextSymbol = array[index + 1] || endHash;
                    const old = map[nextSymbol] || 0;

                    map[nextSymbol] = old + Math.log(1 + weight);
                }
            }
        }

        return model;
    }

    normalize(model) {
        Object.keys(model).forEach(hash => {
            const map = model[hash];
            const keys = Object.keys(map);

            if (keys.length <= 1) delete model[hash];

            const sum = Object.values(map).reduce((a, b) => a + b, 0);

            keys.forEach(key => map[key] = map[key] / sum);
        });

        return model;
    }

    buildStatic(dataset, model, tokenConfig) {
        for (const item of dataset) {
            const { word, weight } = item;
            const sanitized = this.sanitize(word, tokenConfig);
            const old = model[sanitized] || 0;

            model[sanitized] = old + Math.log(1 + weight);
        }

        const keys = Object.keys(model);
        const sum = Object.values(model).reduce((a, b) => a + b, 0);

        keys.forEach(key => model[key] = model[key] / sum);

        return model;
    }
}

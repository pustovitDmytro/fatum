import model from '../../models/ner-sentence.json';
import { capitalize } from '../utils/string';
import TAGS from '../constants/ner.json';
import Generator from './Base';

const insideWordSymbols = [ '-', '/' ];

function last(array) {
    return array[array.length - 1];
}

function isNumber(string) {
    return !Number.isNaN(Number.parseFloat(string));
}

/**
 * Generates a random sentence.
 * @returns {string} sentence
 * @generator
 */
export default class SentenceGenerator extends Generator {
    static model = model;

    generate() {
        const tagSeq = this.generateByModel({ noJOIN: true });

        return tagSeq.map((tag, index, array) => {
            const tagConf = TAGS.find(t => t.id === tag);
            const word = this.fatum.ner(tag);
            const modifiedWord = index === 0 ? capitalize(word) : word;
            const prev = array[index - 1];

            const mergeToPrev = index === 0
            || tagConf.noPrevSpace
            || [ ':', ...insideWordSymbols ].includes(last(word))
            || prev && insideWordSymbols.includes(last(prev))
            || prev && prev === '$' && isNumber(word)
            || modifiedWord[0] === '\'';

            const prefix = mergeToPrev ? '' : ' ';

            return `${prefix}${modifiedWord}`;
        }).join('');
    }
}

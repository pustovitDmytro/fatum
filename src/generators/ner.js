import model from '../../models/ner-tags.json';
import { capitalize } from '../utils/string';
import TAGS from '../constants/ner.json';
import Generator from './Base';

/**
 * Generates a random word according to pos/ner tag.
 * @returns {string} word
 * @param {string} tag the tag, possible values are: B-gpe, CC, EX, I-gpe, I-tim, NN, POS, RBR, UH, VBP, WRB, _$, B-nat, CD, FW, I-nat, JJ, NNP, PRP$, RBS, VB, VBZ, B-art, B-org, _DOT, I-art, IN, JJR, NNPS, PRP, RP, VBD, WDT, B-eve, B-per, _DQ, I-eve, I-org, JJS, NNS, _SQ, VBG, WP$, B-geo, B-tim, DT, I-geo, I-per, MD, PDT, RB, TO, VBN, WP.
 * @generator
 */
export default class NerGenerator extends Generator {
    static model = model;

    generate(tag) {
        const conf = TAGS.find(t => t.id === tag);
        const word = this.generateByModel(tag);

        if (conf.modifiers?.includes('capitalize')) return capitalize(word);

        return word;
    }
}

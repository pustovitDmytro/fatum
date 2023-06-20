import Generator from './Base';

/**
 * Generates a random paragraph.
 * @description a couple of sentences
 * @returns {string} paragraph
 * @requires int
 * @requires sentence
 * @generator
 */
export default class ParagraphGenerator extends Generator {
    generate() {
        // eslint-disable-next-line no-magic-numbers
        const count = this.fatum.int(2, 8);
        const text = [];

        for (let i = 0; i < count; i++) {
            text.push(this.fatum.sentence());
        }

        return text.join(' ');
    }
}

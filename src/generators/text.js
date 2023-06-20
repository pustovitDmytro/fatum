import Generator from './Base';

/**
 * Generates a random text.
 * @description a couple of paragraphs
 * @returns {string} text
 * @requires int
 * @requires paragraph
 * @generator
 */
export default class TextGenerator extends Generator {
    generate() {
        // eslint-disable-next-line no-magic-numbers
        const count = this.fatum.int(2, 6);
        const text = [];

        for (let i = 0; i < count; i++) {
            const newLine = i === 0 ? '' : '\n';

            text.push(`${newLine}\t${this.fatum.paragraph()}`);
        }

        return text.join('');
    }
}

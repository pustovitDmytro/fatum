import Generator from './Base';

/**
 * Generates a random first name.
 * @returns {string} firstName
 * @requires maleFirstName
 * @requires femaleFirstName
 * @requires random
 * @generator
 */
export default class FemaleFirstNameGenerator extends Generator {
    generate() {
        // eslint-disable-next-line no-magic-numbers
        if (this.fatum.random() < 0.5) return this.fatum.maleFirstName();

        return this.fatum.femaleFirstName();
    }
}

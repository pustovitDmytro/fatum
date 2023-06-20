import Generator from './Base';

/**
 * Generates a https website for random domain.
 * @returns {string} website
 * @requires domain
 * @generator
 */
export default class WebsiteGenerator extends Generator {
    generate() {
        return `https://${this.fatum.domain()}`;
    }
}

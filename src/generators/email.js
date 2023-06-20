import Generator from './Base';

/**
 * Generates a random email with a random domain.
 * @returns {string} email
 * @requires nickName
 * @requires domain
 * @generator
 */
export default class EmailGenerator extends Generator {
    generate() {
        return `${this.fatum.nickName()}@${this.fatum.domain()}`;
    }
}

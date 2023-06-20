import Generator from './Base';

/**
 * Generates a random full name.
 * @returns {string} fullName
 * @requires firstName
 * @requires lastName
 * @generator
 */
export default class FullNameGenerator extends Generator {
    generate() {
        return `${this.fatum.firstName()} ${this.fatum.lastName()}`;
    }
}

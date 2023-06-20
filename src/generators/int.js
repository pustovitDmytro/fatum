import Generator from './Base';

/**
 * Generates a random integer in specified range.
 * @returns {integer} number
 * @param {integer} min minimum possible value
 * @param {integer} max maximum possible value
 * @requires uniform
 * @generator
 */

export default class IntGenerator extends Generator {
    generate(min, max) {
        return Math.round(this.fatum.uniform(min, max));
    }
}

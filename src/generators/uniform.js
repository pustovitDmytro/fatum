import Generator from './Base';

/**
 * Generates a random number in specified range.
 * @returns {integer} number
 * @param {number} min minimum possible value
 * @param {number} max maximum possible value
 * @requires number
 * @generator
 */
export default class UniformGenerator extends Generator {
    generate(min, max) {
        return this.fatum.random() * (max - min) + min;
    }
}

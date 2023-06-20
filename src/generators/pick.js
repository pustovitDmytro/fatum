import Generator from './Base';

/**
 * Pick random item from the array.
 * @param {array} options list of available options
 * @returns {any} item
 * @requires int
 * @generator
 */
export default class PickGenerator extends Generator {
    generate(array) {
        const index = this.fatum.int(0, array.length - 1);

        return array[index];
    }
}

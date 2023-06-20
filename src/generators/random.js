/* eslint-disable no-magic-numbers */
import crypto from 'crypto';
import Generator from './Base';

/**
 * Generates a random number from 0 to 1.
 * @returns {number} number
 * @generator
 */
export default class RandomGenerator extends Generator {
    generate() {
        const bytes = crypto.randomBytes(7);

        let randomValue = (bytes[0] % (2 ** 5)) / (2 ** 5);

        bytes.slice(1).forEach(byte => {
            randomValue = (randomValue + byte) / (2 ** 8);
        });

        return randomValue;
    }
}

import Generator from './Base';

/**
 * Generates a random password.
 * @description uppercase/lowercase alpha combined with numbers, 10-24 symbols
 * @returns {string} password
 * @requires int
 * @requires pick
 * @generator
 */
export default class PasswordGenerator extends Generator {
    generate() {
        const alphabet = [
            ...'abcdefghijklmnopqrstuvwxyz',  // eslint-disable-line no-secrets/no-secrets
            ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',  // eslint-disable-line no-secrets/no-secrets
            ...'0123456789'
        ];

        // eslint-disable-next-line no-magic-numbers
        const len = this.fatum.int(10, 24);
        const word = [];

        for (let i = 0; i < len; i++) {
            word.push(this.fatum.pick(alphabet));
        }

        return word.join('');
    }
}

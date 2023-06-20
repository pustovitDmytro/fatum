import model from '../../models/nickname.json';
import Generator from './Base';

const safeLength = 16;

/**
 * Generates a random nickName.
 * @returns {string} nickName
 * @generator
 */
export default class NickNameGenerator extends Generator {
    static model = model;

    static safeLength = safeLength;

    generate() {
        return this.generateByModel();
    }
}

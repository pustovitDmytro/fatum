import model from '../../models/us_first_name_male.json';
import { capitalize } from '../utils/string';
import Generator from './Base';

/**
 * Generates a random male first name.
 * @returns {string} firstName
 * @generator
 */
export default class MaleFirstNameGenerator extends Generator {
    static model = model;

    generate() {
        return capitalize(
            this.generateByModel()
        );
    }
}

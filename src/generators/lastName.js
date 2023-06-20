import model from '../../models/lastName.json';
import { capitalize } from '../utils/string';
import Generator from './Base';

/**
 * Generates a random last name.
 * @returns {string} lastName
 * @generator
 */
export default class LastNameGenerator extends Generator {
    static model = model;

    generate() {
        return capitalize(
            this.generateByModel()
        );
    }
}

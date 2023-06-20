import model from '../../models/us_first_name_female.json';
import { capitalize } from '../utils/string';
import Generator from './Base';

/**
 * Generates a random female first name.
 * @returns {string} firstName
 * @generator
 */
export default class FemaleFirstNameGenerator extends Generator {
    static model = model;

    generate() {
        return capitalize(
            this.generateByModel()
        );
    }
}

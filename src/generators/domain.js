import model from '../../models/domain.json';
import Generator from './Base';

/**
 * Generates a 3rd-level random domain in random domain zone.
 * @returns {string} domain
 * @requires domainZone
 * @generator
 */
export default class DomainGenerator extends Generator {
    static model = model;

    generate() {
        return `${this.generateByModel()}.${this.fatum.domainZone()}`;
    }
}

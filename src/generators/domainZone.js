import model from '../../models/domain_zone.json';
import Generator from './Base';

/**
 * Generates a random domain zone.
 * @returns {string} domainZone
 * @generator
 */
export default class DomainZoneGenerator extends Generator {
    static model = model;

    generate() {
        const seq = this.generateByModel({ noJOIN: true });

        return seq.join('.');
    }
}

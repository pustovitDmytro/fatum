import crypto from 'crypto';
import Generator from './Base';

/**
 * Generates a random uuid.
 * @returns {string} uuid
 * @generator
 */
export default class UUIDGenerator extends Generator {
    generate() {
        return crypto.randomUUID();
    }
}

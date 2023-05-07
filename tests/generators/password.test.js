import { assert } from 'chai';
import entry from '../entry';

suite('Generators: password');

test('password', function () {
    assert.exists(entry.password());
});

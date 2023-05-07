import { assert } from 'chai';
import entry from '../entry';

suite('Generators: firstName');

test('male name', function () {
    assert.exists(entry.maleFirstName());
});

test('female name', function () {
    assert.exists(entry.femaleFirstName());
});

test('first name', function () {
    assert.exists(entry.firstName());
});

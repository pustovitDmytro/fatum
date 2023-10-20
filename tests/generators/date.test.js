import { assert } from 'chai';
import entry from '../entry';

suite('Generators: date');

test('no params', function () {
    const date = entry.date();

    assert.isAbove(date, new Date(Date.now() - 366 * 24 * 60 * 60 * 1000));
    assert.isBelow(date, new Date());
});

test('next week', function () {
    const min = new Date();
    const max = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const date = entry.date(min, max);

    assert.isAbove(date, min);
    assert.isBelow(date, max);
});

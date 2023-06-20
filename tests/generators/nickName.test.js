import { assert } from 'chai';
import entry from '../entry';

suite('Generators: nickName');

test('nickName', function () {
    assert.exists(entry.nickName());
});

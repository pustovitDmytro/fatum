import path from 'path';
import { Readable, PassThrough } from 'stream';
import { assert } from 'chai';
import { v4 } from 'uuid';
import fs from 'fs-extra';
import { isString } from 'myrmidon';
import { load } from '../utils';
import models from '../../models/index.json';
import { tmpFolder } from '../constants';
import Test from '../Test';

const factory = new Test();

const loaded = {};

suite('fixtures: merge #no-pack');

before(async function () {
    await factory.setTmpFolder();
    const { default:main } = load('../bin/fixtures.js');
    const { merge } = load('../tools/fixturesMerge');

    loaded.merge = merge;
    loaded.main = main;
});

function stringToStream(string) {
    const s = new Readable();

    s.push(string);
    // eslint-disable-next-line unicorn/no-array-push-push
    s.push(null);

    return s;
}

async function streamToString(stream) {
    const chunks = [];

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

test('merge', async function () {
    const output =  new PassThrough();

    const input = `abcd,1,
    def,3,
    abcd,4,
    jj ,2`;

    const stat = await loaded.merge(stringToStream(input), output);

    output.end();
    assert.deepOwnInclude(stat, { total: 4, merged: 3 });

    const result = await streamToString(output);

    assert.equal(result, 'abcd,5\ndef,3\njj,2');
});

async function areFilesSameLength(actual, expected) {
    const buffers = await Promise.all([ actual, expected ].map(p => fs.readFile(p)));
    const [ actualLength, expectedLength ] = buffers.map(b => b.toString().split('\n').length);


    assert.equal(actualLength, expectedLength);
}

for (const model of models) {
    if (!isString(model.fixture)) continue;
    test(`verify ${model.fixture} has no duplicates`, async function () {
        const fixture = path.join(__dirname, '../../', model.fixture);
        const outPath = path.join(tmpFolder, `${v4()}.csv`);

        await loaded.main({
            merge   : true,
            '--in'  : fixture,
            '--out' : outPath
        });

        await areFilesSameLength(outPath, fixture);
    });
}

after(async function () {
    await factory.cleanTmpFolder();
});

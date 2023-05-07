import path from 'path';
import readline from 'readline';
import { Readable, PassThrough } from 'stream';
import { assert } from 'chai';
import { v4 } from 'uuid';
import fs from 'fs-extra';
import { load } from '../utils';
import models from '../../models/index.json';
import { tmpFolder } from '../constants';
import Test from '../Test';

const factory = new Test();

const { merge, default:main } = load('../bin/fixtures.js');

suite('fixtures: merge');

before(async function () {
    await factory.setTmpFolder();
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

    const input = `
    abcd,1,
    def,3,
    abcd,4,
    jj ,2
    `;

    const rl = readline.createInterface({
        input : stringToStream(input),
        output
    });

    const stat = await merge(rl);

    output.end();
    assert.deepEqual(stat, { total: 4, merged: 3 });

    const result = await streamToString(output);

    assert.equal(result, 'abcd,5\ndef,3\njj,2');
});

async function areFilesSame(actual, expected) {
    const [ actualBuff, expectedBuff ] = await Promise.all([ actual, expected ].map(p => fs.readFile(p)));

    assert.isTrue(actualBuff.equals(expectedBuff));
}

for (const model of models) {
    test(`verify ${model.fixture} has no duplicates`, async function () {
        const fixture = path.join(__dirname, '../../', model.fixture);
        const outPath = path.join(tmpFolder, `${v4()}.csv`);

        await main({
            merge   : true,
            '--in'  : fixture,
            '--out' : outPath
        });

        await areFilesSame(outPath, fixture);
    });
}

after(async function () {
    await factory.cleanTmpFolder();
});

#!./node_modules/.bin/babel-node

import path from 'path';
import readline from 'readline';
import { docopt } from 'docopt';
import fs from 'fs-extra';
import { start, end, indexToPosition, toHash, maxLettersSymbol  } from '../src/utils/hashUtils';
import models from '../models';

const doc = `
Usage:
   build.js model <name>
   build.js all
   build.js -h | --help

Options:
   -h --help    Build models.
`;

const isCLI = !module.parent;

export class ModelBuilder {
    collectHashes(letter, sanitized, index) {
        if (letter === null) return [ toHash(start) ];

        const hashes = [];
        const symbols = [];

        for (let limit = 0; limit < maxLettersSymbol; limit++) {
            const sliced = sanitized.slice(index - limit, index + 1);

            if (sliced.length > 0) symbols.push(sliced);
        }

        symbols.forEach(symbol => {
            hashes.push(
                symbol,
                toHash({
                    symbol,
                    position : indexToPosition(index)
                })
            );
        });

        return hashes;
    }

    build(dataset) {
        const model = {};

        for (const item of dataset) {
            const { word, weight } = item;
            const sanitized = word.toLowerCase();

            // eslint-disable-next-line no-loop-func
            [ null, ...sanitized ].forEach((letter, index, array) => {
                const hashes = this.collectHashes(letter, sanitized, index - 1);

                hashes.forEach(hash => {
                    let map = model[hash];

                    if (!map) {
                        map = {};
                        model[hash] = map;
                    }

                    const nextSymbol = array[index + 1] || toHash(end);

                    const old = map[nextSymbol] || 0;

                    map[nextSymbol] = old + Math.log(weight);
                });
            });
        }

        Object.keys(model).forEach(hash => {
            const map = model[hash];
            const keys = Object.keys(map);

            if (keys.length <= 1) delete model[hash];
            const sum = Object.values(map).reduce((a, b) => a + b, 0);

            // eslint-disable-next-line no-param-reassign
            keys.forEach(key => map[key] = map[key] / sum);
        });

        return model;
    }
}

const builder = new ModelBuilder();

export async function buildModel(model) {
    const output =  fs.createWriteStream(
        path.resolve(__dirname, '../models/', `${model.model}.json`),
        { encoding: 'utf8' }
    );

    const input = fs.createReadStream(path.resolve(__dirname, '../', model.fixture));

    const rl = readline.createInterface({ input, output });

    const data = await new Promise((res, rej) => {
        const dataset = [];

        rl.on('line', (line) => {
            const [ word, weight ] = line.split(',');
            const sanitized = word.trim().toLowerCase();

            if (!sanitized) return;
            dataset.push({ word, weight: +weight });
        });
        rl.on('error', error => rej(error));
        rl.on('close', () => {
            res(dataset);
        });
    });

    const matrix = builder.build(data);

    rl.output.write(JSON.stringify({
        id : model.model,
        matrix
    }));

    rl.output.end();

    return { total: data.length };
}

export default async function main(opts) {
    try {
        if (opts.all) {
            for (const model of models) {
                const stat = await buildModel(model);

                console.log(model.model, stat);
            }
        }

        if (opts.model) {
            const fix = models.find(m => m.model === opts['<name>']);
            const stat = await buildModel(fix);

            console.log(fix.model, stat);
        }

        if (isCLI) process.exit(0);
    } catch (error) {
        console.error(error);
        if (isCLI) process.exit(1);
    }
}

if (isCLI) main(docopt(doc));

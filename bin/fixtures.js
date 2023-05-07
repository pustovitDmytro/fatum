#!./node_modules/.bin/babel-node

import path from 'path';
import readline from 'readline';
import { docopt } from 'docopt';
import fs from 'fs-extra';

const doc =
`Usage:
   fixtures.js merge --in=<in-file-name> --out=<out-file-name>
   fixtures.js -h | --help

Options:
   -h --help    Handle fixtures.
`;

const isCLI = !module.parent;

// Keep columns 2-4, 5
// cat input.csv | cut -d , -f 2-4,5 > fixtures/out.csv

export async function merge(rl) {
    return new Promise((res, rej) => {
        const result = { total: 0 };
        const merged = {};

        rl.on('line', (line) => {
            const [ word, weight ] = line.split(',');
            const sanitized = word.trim().toLowerCase();

            if (!sanitized) return;
            result.total++;
            const current = merged[sanitized] || 0;

            merged[sanitized] = current + Number.parseFloat(weight);
        });
        rl.on('error', error => rej(error));
        rl.on('close', () => {
            const text = Object.keys(merged).map(word => `${word},${merged[word]}`).join('\n');

            rl.output.write(text);

            res({
                ...result,
                merged : Object.keys(merged).length
            });
        });
    });
}

export default async function main(opts) {
    const output =  fs.createWriteStream(
        path.resolve(process.cwd(), opts['--out']),
        { encoding: 'utf8' }
    );

    const input = fs.createReadStream(path.resolve(process.cwd(), opts['--in']));

    const rl = readline.createInterface({ input, output });

    try {
        if (opts.merge) {
            const stat = await merge(rl);

            console.log('merge:', stat);
        }

        if (isCLI) process.exit(0);
    } catch (error) {
        console.error(error);
        if (isCLI) process.exit(1);
    }
}

if (isCLI) main(docopt(doc));

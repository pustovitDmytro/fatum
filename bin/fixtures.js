#!./node_modules/.bin/babel-node

import path from 'path';
import { docopt } from 'docopt';
import fs from 'fs-extra';
import { merge } from '../tools/fixturesMerge';
import { dust, dropColumns } from '../tools/fixturesCleanup';
import { parse as parseNer } from '../tools/ner';

const doc =
`Usage:
   fixtures.js merge --in=<in-file-name> --out=<out-file-name>
   fixtures.js drop_dust --in=<in-file-name> --out=<out-file-name> --threshold=<threshold>
   fixtures.js ner --in=<in-file-name> [--out=<out-file-name>]
   fixtures.js drop_columns --in=<in-file-name> --out=<out-file-name> --columns=<columns>
   fixtures.js -h | --help

Options:
   -h --help    Handle fixtures.
`;


const isCLI = !module.parent;

export default async function main(opts) {
    const noOut = opts.ner;
    const output = !noOut && fs.createWriteStream(
        path.resolve(process.cwd(), opts['--out']),
        { encoding: 'utf8' }
    );

    const input = fs.createReadStream(path.resolve(process.cwd(), opts['--in']));

    try {
        if (opts.merge) {
            const stat = await merge(input, output);

            console.log('merge:', stat);
        }

        if (opts.drop_dust) {
            const stat = await dust(input, output, opts['--threshold']);

            console.log('dust:', stat);
        }

        if (opts.ner) {
            const stat = await parseNer(input, opts['--out']);

            console.log('ner:', stat);
        }

        if (opts.drop_columns) {
            const stat = await dropColumns(
                input,
                output,
                opts['--columns'].split(' ').map(i => Number.parseInt(i, 10))
            );

            console.log('drop_columns:', stat);
        }

        if (isCLI) process.exit(0);
    } catch (error) {
        console.error(error);
        if (isCLI) process.exit(1);
    }
}

if (isCLI) main(docopt(doc));

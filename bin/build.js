#!./node_modules/.bin/babel-node

import { docopt } from 'docopt';
import models from '../models';
import ModelBuilder from '../tools/ModelBuilder';
import buildModel from '../tools/buildModel';

const doc = `
Usage:
   build.js model <name>
   build.js all
   build.js -h | --help

Options:
   -h --help    Build models.
`;

const isCLI = !module.parent;


const builder = new ModelBuilder();

export default async function main(opts) {
    try {
        if (opts.all) {
            for (const model of models) {
                const stat = await buildModel(model, builder);

                console.log(model.model, stat);
            }
        }

        if (opts.model) {
            const fix = models.find(m => m.model === opts['<name>']);
            const stat = await buildModel(fix, builder);

            console.log(fix.model, stat);
        }

        if (isCLI) process.exit(0);
    } catch (error) {
        console.error(error);
        if (isCLI) process.exit(1);
    }
}

if (isCLI) main(docopt(doc));

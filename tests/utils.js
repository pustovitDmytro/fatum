import path from 'path';
import { inspect } from 'util';
import  { Mocha } from 'code-chronicle';
import BenchMark, { JSONReporter } from 'vesta';
import { assert } from 'chai';
import { entry } from './constants';

let mocha = null;

if (process.env.SAVE_EXAMPLES) {
    mocha = new Mocha({
        examplesPath : path.resolve(process.cwd(), process.env.SAVE_EXAMPLES)
    });
    mocha.installHooks();
}

export function load(relPath, clearCache) {
    const absPath = path.resolve(entry, relPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];
    // eslint-disable-next-line security/detect-non-literal-require
    const result =  require(absPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];

    return result;
}

export function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}

function samplesToSave(results) {
    const serializedOut = results.map(r => inspect(r));
    const avgLen = serializedOut.reduce((a, b) => a + b.length, 0) / results.length;

    if (avgLen < 25) return serializedOut.slice(0, 25).join(', ');
    if (avgLen < 100) return serializedOut.slice(0, 10).join(', ');
    if (avgLen < 500) return serializedOut.slice(0, 5).join('\n');

    return results[0];
}

export class GeneratorTester {
    constructor() {
        const { default:fatum } = load(entry);

        this._fatum = fatum;
    }

    test(method, ...input) {
        const generator = this._fatum[method].bind(this._fatum);
        const bench = new BenchMark();
        const SamplesCount = 1000;

        return function () {
            const results = [];

            const b0 = bench.start(method);

            for (let i = 0; i < SamplesCount; i++) {
                results.push(generator(...input));
            }

            bench.end(b0);

            if (mocha) {
                const performanceReport = JSON.parse(bench.report(new JSONReporter()));
                const opts = results.length / (performanceReport[0].benchmark / 1000);
                const currentTest = mocha._ns.get('current');

                mocha.EXAMPLES.push({
                    type   : 'generator-example',
                    output : samplesToSave(results),
                    input  : input.length > 0 ? input.map(i => inspect(i)).join(', ') : null,
                    opts   : Math.ceil(opts),
                    method,
                    test   : currentTest.id
                });
            }

            results.forEach(r => assert.exists(r));

            return results;
        };
    }
}

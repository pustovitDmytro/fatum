/* eslint-disable unicorn/no-await-expression-member */
import path from 'path';
import fs from 'fs-extra';
import { isArray, isObject } from 'myrmidon';
import * as csv from 'fast-csv';

const BUILD_MARKOW_TREASHOLD = 100;
const PROGRESS_TICK = 1_000_000;

async function getModel(builder, fixtureFile, modelConfig, prevModel, finalize) {
    const input = fs.createReadStream(path.resolve(__dirname, '../', fixtureFile));
    const tokenConfig = modelConfig.token || {
        'delim' : '',
        'case'  : 'LOWER'
    };

    const data = await new Promise((res, rej) => {
        const dataset = [];

        input
            .pipe(csv.parse({
                headers   : false,
                delimiter : ','
            }))
            .on('error', error => rej(error))
            .on('data', (row) => {
                const [ word, weight = 1 ] = row;
                const sanitized = word.trim();

                if (!sanitized) return;
                dataset.push({ word, weight: +weight });
                if (dataset.length % PROGRESS_TICK === 0) console.log(dataset.length);
            })
            .on('end', () => res(dataset));
    });

    const result = {
        id      : modelConfig.model,
        dataset : { size: data.length }
    };

    if (data.length > BUILD_MARKOW_TREASHOLD) {
        const matrix = builder.buildMarkov(data, prevModel, tokenConfig);
        const normalized = finalize ? builder.normalize(matrix) : matrix;

        return {
            ...result,
            type   : 'markov',
            matrix : normalized
        };
    }

    const matrix = builder.buildStatic(data, prevModel, tokenConfig);

    return {
        ...result,
        type : 'static',
        matrix
    };
}

export async function appendFixtureFile(builder, fixtureFile, modelConfig, modelFile, finalize) {
    const isModelExists = await fs.exists(modelFile);
    const prevModel = isModelExists
        ? (await fs.readJSON(modelFile)).matrix
        : {};

    const data = await getModel(builder, fixtureFile, modelConfig, prevModel, finalize);

    await fs.writeJSON(modelFile, data);

    return data.dataset;
}

async function buildComplexModel(builder, { type, fixture }, model, modelFile) {
    const isModelExists = await fs.exists(modelFile);

    if (!isModelExists) {
        await fs.writeJSON(modelFile, {
            id    : model.id,
            type  : 'merged_types',
            types : {}
        });
    }

    const prevData = await fs.readJSON(modelFile);
    const typeData = await getModel(builder, fixture, model, {}, true);

    prevData.types[type] = typeData;

    await fs.writeJSON(modelFile, {
        ...prevData
    });

    return typeData.dataset;
}

export default async function buildModel(model, builder) {
    const modelFile = path.resolve(__dirname, '../models/', `${model.model}.json`);

    await fs.remove(modelFile);

    if (isObject(model.fixture)) {
        const totalStats = {};

        for (const type of Object.keys(model.fixture)) {
            const stats = await buildComplexModel(
                builder,
                { type, fixture: model.fixture[type] },
                model,
                modelFile
            );

            console.log(type, stats);
            totalStats[type] = stats;
        }

        return totalStats;
    }

    if (isArray(model.fixture)) {
        const totalStats = {};

        for (const fixture of model.fixture) {
            const isLast = model.fixture[model.fixture.length - 1] === fixture;
            const stats = await appendFixtureFile(builder, fixture, model, modelFile, isLast);

            console.log(fixture, stats);
            totalStats[fixture] = stats;
        }

        return totalStats;
    }

    const stats = await appendFixtureFile(builder, model.fixture, model, modelFile, true);

    console.log(model.model, stats);

    return stats;
}

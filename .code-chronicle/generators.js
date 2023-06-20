/* eslint-disable no-param-reassign */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const path = require('path');
const { toArray, uniqueIdenticFilter } = require('myrmidon');
const generators = require('../lib/generators');

const GeneratorsClassNames = new Map();

Object.keys(generators).forEach(id => GeneratorsClassNames.set(generators[id].name, id));

module.exports = {
    onSection(section) {
        const values = section.values[0];
        const generatorName = values.name;
        const generatorId = GeneratorsClassNames.get(generatorName);

        values.id = generatorId;

        if (values.tags.requires) values.tags.requires = toArray(values.tags.requires);
    },
    filterExamples(values, cases) {
        const examples = cases.filter(c =>
            c.examples[0].method === GeneratorsClassNames.get(values.name));

        if (examples.length > 0) {
            values.opts = examples[0].examples[0].opts;
        }

        return {
            examples,
            testFiles : examples
                .map(e => path.relative(process.cwd(), e.file))
                .filter(uniqueIdenticFilter) // eslint-disable-line unicorn/no-array-callback-reference

        };
    },
    handlebars(HandleBars) {
        HandleBars.registerHelper('json', json => {
            return JSON.stringify(json);
        });
    }
};

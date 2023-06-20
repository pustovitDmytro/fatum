import Markov from './Markov';
import Static from './Static';

export default class BaseGenerator {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    constructor(fatum) {
        this.fatum = fatum;
        if (this.constructor.model) {
            const { type } = this.constructor.model;

            if (type === 'markov') {
                this._markov = new Markov(this.constructor.model, this.constructor.safeLength);
            }

            if (type === 'merged_types') {
                this._generators = {};
                for (const typeName of Object.keys(this.constructor.model.types)) {
                    const model = this.constructor.model.types[typeName];

                    if (model.type === 'markov') {
                        this._generators[typeName] = new Markov(model);
                    }

                    if (model.type === 'static') {
                        this._generators[typeName] = new Static(model);
                    }
                }
            }
        }
    }

    generateByModel(type, ...params) {
        if (this._markov) return this._markov.generate(type, ...params);
        if (this._generators) return this._generators[type].generate(...params);
    }
}

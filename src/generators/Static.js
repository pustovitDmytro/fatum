
function pickMap(map) {
    const rand = Math.random();

    let accum = 0;

    for (const token of Object.keys(map)) {
        const curr = map[token];

        accum += curr;
        if (rand < accum) return token;
    }
}

export default class Generator {
    constructor(model) {
        this._model = model.matrix;
    }

    generate() {
        return pickMap(this._model);
    }
}

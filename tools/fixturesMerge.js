import * as csv from 'fast-csv';

const PROGRESS_TICK = 1_000_000;

export async function merge(input, output) {
    const result = { total: 0 };
    const merged = {};

    function handleLine(row) {
        const [ word, weight = 1 ] = row;
        const sanitized = word.trim().toLowerCase();

        if (!sanitized) return;
        result.total++;
        const current = merged[sanitized] || 0;

        merged[sanitized] = current + Number.parseFloat(weight);

        if (result.total % PROGRESS_TICK === 0) console.log(result.total);
    }

    return new Promise((res, rej) => {
        function handleSave(rowCount) {
            const text = Object.keys(merged).map(word => `${word},${merged[word]}`).join('\n');

            output.write(text);

            res({
                ...result,
                rowCount,
                merged : Object.keys(merged).length
            });
        }

        input
            .pipe(csv.parse({
                headers   : false,
                delimiter : ','
            }))
            .on('error', error => rej(error))
            .on('data', (row) => handleLine(row))
            .on('end', (rowCount) => handleSave(rowCount));
    });
}

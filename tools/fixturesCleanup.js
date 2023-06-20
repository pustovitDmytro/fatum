import * as csv from 'fast-csv';

export async function dust(input, output, threshold) {
    const result = { total: 0 };
    const merged = {};

    return new Promise((res, rej) => {
        input
            .pipe(csv.parse({
                headers   : false,
                delimiter : ','
            }))
            .pipe(csv.format({ headers: false }))
            .on('error', error => rej(error))
            .transform((row, next) => {
                const [ word, weight ] = row;
                const sanitized = word.trim().toLowerCase();

                if (!sanitized) return;
                result.total++;
                const num = weight && Number.parseFloat(weight);
                const isGood = num && (num > threshold);

                if (!isGood) return;
                merged[sanitized] = num;

                next(null, row);
            })
            .pipe(output)
            .on('end', (rowCount) => res({ total: rowCount }));
    });
}


export async function dropColumns(input, output, columns) {
    return new Promise((res, rej) => {
        input
            .pipe(csv.parse({
                headers   : false,
                delimiter : ','
            }))
            .pipe(csv.format({ headers: false }))
            .on('error', error => rej(error))
            .transform((row, next) => {
                const cols = row.filter((e, index) => columns.includes(index));

                next(null, cols);
            })
            .pipe(output)
            .on('end', (rowCount) => res({ total: rowCount }));
    });
}


import path from 'path';
import fs from 'fs-extra';
import * as csv from 'fast-csv';
import TAGS from '../src/constants/ner.json';


const FORBIDDEN = [ '�', '"', '(', ')', '[', ']' ];

function hanldeLine(line) {
    const [ sentenceID, word, pos, ner ] = line;

    if (sentenceID) {
        this.sentence = {
            id   : sentenceID,
            tags : []
        };
        this.sentences.push(this.sentence);
    }

    const selectedTag = ner !== 'O' ? ner : pos;

    const tag = TAGS.find(t => t.fixture === selectedTag);

    if (!tag || FORBIDDEN.some(i => word.includes(i))) {
        // console.log({ word, pos, ner });
        return;
    }

    if (!this.tags[tag.id]) this.tags[tag.id] = [];

    this.tags[tag.id].push(word);
    this.sentence.tags.push(tag.id);
}

async function saveContext(tmpDir) {
    const result = {
        dir       : tmpDir,
        sentences : this.sentences.length,
        tags      : Object.keys(this.tags)
    };

    await fs.remove(tmpDir);
    await fs.ensureDir(tmpDir);
    const promises = [
        fs.writeFile(
            path.join(tmpDir, 'sentences.txt'),
            this.sentences.map(s => s.tags.join(' ')).join('\n')
        )
    ];

    Object.keys(this.tags).forEach(tId => {
        const merged = {};

        for (const word of this.tags[tId]) {
            const sanitized = word.trim().toLowerCase();
            const current = merged[sanitized] || 0;

            merged[sanitized] = current + 1;
        }

        promises.push(
            fs.writeFile(
                path.join(tmpDir, `tag_${tId}.csv`),
                Object.keys(merged).map(word => `${word},${merged[word]}`).join('\n')
            )
        );
    });

    await Promise.all(promises);

    console.log(`Written to ${tmpDir}`);

    return result;
}

export async function parse(input, tmpDir = path.join(__dirname, '../tmp/ner')) {
    const context = {
        total     : 0,
        sentences : [],
        tags      : {},
        sentence  : null
    };

    return new Promise((res, rej) => {
        input
            .pipe(csv.parse({
                headers   : false,
                delimiter : ','
            }))
            .on('error', error => rej(error))
            .on('data', hanldeLine.bind(context))
            .on('end', async () => {
                const result = await saveContext.call(context, tmpDir);

                res(result);
            });
    });
}

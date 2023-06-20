import { assert } from 'chai';
import entry from '../entry';

suite('Generators: uniform');

const sse = arr => arr.reduce((a, num) => a + (num ** 2), 0) / arr.length;

test('Distribution', function () {
    const min = -10;
    const max = 20;
    const expectedPerSegment = 10_000;
    const segmentWidth = 1;
    const allowedMaxDiff = 0.05;

    const segments = Array.from({ length: (max - min) / segmentWidth }).map((i, index) => {
        const from = min + index * segmentWidth;

        return {
            from,
            to    : from + segmentWidth,
            count : 0
        };
    });

    for (let i = 0; i < segments.length * expectedPerSegment; i++) {
        const num = entry.uniform(min, max);
        const index = Math.ceil((num - segmentWidth) / segmentWidth) - min;

        segments[index].count += 1;
    }

    for (const segment of segments) {
        segment.error =  Math.abs(segment.count - expectedPerSegment) / expectedPerSegment;
        assert.isAtMost(
            segment.error,
            allowedMaxDiff,
            JSON.stringify(segment)
        );
    }

    const errors = segments.map(s => s.error);

    assert.isAtMost(sse(errors), allowedMaxDiff / 2, errors);
});

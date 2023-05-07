import entry from '../entry';

const ITEMS = 100;

suite('Generators: performance');

function testPerformance(method) {
    return Array.from({ length: ITEMS }).map(() => entry[method]());
}

test('firstName', function () {
    console.log(testPerformance('firstName'));
});

test('password', function () {
    console.log(testPerformance('password'));
});

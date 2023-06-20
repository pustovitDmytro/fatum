import { GeneratorTester } from '../utils';

suite('Test examples');

const tester = new GeneratorTester();

test('random domain', tester.test('domain'));
test('random domainZone', tester.test('domainZone'));
test('random email', tester.test('email'));
test('random femaleFirstName', tester.test('femaleFirstName'));
test('random firstName', tester.test('firstName'));
test('random fullName', tester.test('fullName'));
test('random int', tester.test('int', -3, 12));
test('random lastName', tester.test('lastName'));
test('random maleFirstName', tester.test('maleFirstName'));
test('VB ner word', tester.test('ner', 'VB'));
test('random nickName', tester.test('nickName'));
test('random paragraph', tester.test('paragraph'));
test('random password', tester.test('password'));
test('pick an item from array', tester.test('pick', [ 'AB', 'BC', 'CA' ]));
test('pick an letter from string', tester.test('pick', 'ABCDEF'));
test('random random', tester.test('random'));
test('random sentence', tester.test('sentence'));
test('random text', tester.test('text'));
test('random uniform', tester.test('uniform', 4, 8));
test('random uuid', tester.test('uuid'));
test('random website', tester.test('website'));

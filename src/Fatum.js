/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
import us_first_name_female from '../models/us_first_name_female.json';
import us_first_name_male from '../models/us_first_name_male.json';
import Generator from './Generator';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class Fatum {
    // setLocale(locale) {
    //     this.locale = locale;
    // }

    maleFirstName() {
        const generator = new Generator(us_first_name_male);

        return capitalize(generator.generate());
    }

    femaleFirstName() {
        const generator = new Generator(us_first_name_female);

        return capitalize(generator.generate());
    }

    firstName() {
        if (Math.random() < 0.5) return this.maleFirstName();

        return this.femaleFirstName();
    }

    password() {
        const alphabet = [
            ...'abcdefghijklmnopqrstuvwxyz',  // eslint-disable-line no-secrets/no-secrets
            ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',  // eslint-disable-line no-secrets/no-secrets
            ...'0123456789'
        ];

        const len = this.int(8, 24);
        const word = [];

        for (let i = 0; i < len; i++) {
            word.push(this.pick(alphabet));
        }

        return word.join('');
    }

    uniform(min, max) {
        return Math.random() * (max - min) + min;
    }

    int(min, max) {
        return Math.floor(this.uniform(min, max));
    }

    pick(array) {
        const index = this.int(0, array.length);

        return array[index];
    }
}

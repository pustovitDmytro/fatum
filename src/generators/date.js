import Generator from './Base';

/**
 * Generates a random date in specified range.
 * @returns {date} random date
 * @param {date} min minimum possible value
 * @param {date} max maximum possible value
 * @requires int
 * @generator
 */


function subtractYear(date) {
    const res = new Date();

    res.setFullYear(date.getFullYear() - 1);

    return res;
}

export default class DateGenerator extends Generator {
    generate(min, max) {
        const now = new Date();
        const minDate = min || subtractYear(now);
        const maxDate = max || now;
        const diff = maxDate - minDate;

        if (diff === 0) return minDate;
        const absDiff = Math.abs(diff);
        const rand = this.fatum.int(0, absDiff);
        const timestamp = +minDate + absDiff / diff * rand;

        return new Date(timestamp);
    }
}

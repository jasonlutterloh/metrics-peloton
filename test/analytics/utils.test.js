import { intros } from 'svelte/internal';
import {formatNumberWithCommas, getFriendlyDate, trimRideTitle} from '../../src/analytics/utils';

describe('trimRideTitle', () => {
    it('should trim "min" from the ride title', () => {
        expect(trimRideTitle('30 min Tabata Ride')).toBe('Tabata Ride');
        expect(trimRideTitle('45 min Together We Go Far')).toBe('Together We Go Far');
        expect(trimRideTitle('Tabata Ride')).toBe('Tabata Ride');
    })
});

describe('getFriendlyDate', () => {
    it('should return the date in a friendly format', () => {
        expect(getFriendlyDate("2020-01-01")).toBe("Jan 01, 2020");
        expect(getFriendlyDate("2020-02-29")).toBe("Feb 29, 2020");
        expect(getFriendlyDate("2020-12-31")).toBe("Dec 31, 2020");
    });

    it('should return "Invalid Date" on a non-date string or null', () => {
        expect(getFriendlyDate("badData")).toBe("Invalid Date");
        expect(getFriendlyDate(null)).toBe("Invalid Date");
    });
})

// This method is not safe for numbers with more than three decimal places
describe('formatNumberWithCommas', () => {
    it('should add commas in the proper places', () => {
        expect(formatNumberWithCommas(100)).toBe('100');
        expect(formatNumberWithCommas(1000)).toBe('1,000');
        expect(formatNumberWithCommas(10000)).toBe('10,000');
        expect(formatNumberWithCommas(100000)).toBe('100,000');
        expect(formatNumberWithCommas(1000000)).toBe('1,000,000');
    });
    it('should do nothing with strings or other input', () => {
        expect(formatNumberWithCommas("string")).toBe('string');
    })
});

const { getReadableDate } = require("../../src/utils/dateUtils");

describe('getReadableDate', () => {
    it('should return a date in the following format "YYYY-MM-DD', () => {
        let date = getReadableDate("2020-02-05 09:22 (CDT)");
        expect(date).toContain("2020-02-05");
    })
})
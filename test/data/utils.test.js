const fs = require('fs')
const path = require('path');
const { CSVtoJSON } = require("../../src/data/utils")

let csv = "";

beforeEach(() => {
    try {
        csv = fs.readFileSync(path.resolve(__dirname, './testData.csv'), 'utf8')
      } catch (err) {
        console.error(err)
      }
});

describe('CSVtoJSON', () => {
    it('should convert csv data to a json object', () => {
        let result = CSVtoJSON(csv);
        expect(result).toHaveLength(167);
    });
})
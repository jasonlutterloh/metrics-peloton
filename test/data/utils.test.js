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
        const expectedKeys = ["Workout Timestamp","Live/On-Demand","Instructor Name","Length (minutes)","Fitness Discipline","Type","Title","Class Timestamp","Total Output","Avg. Watts","Avg. Resistance","Avg. Cadence (RPM)","Avg. Speed (mph)","Distance (mi)","Calories Burned","Avg. Heartrate","Avg. Incline","Avg. Pace (min/mi)"];
        result.forEach(element => {
            let keys = Object.keys(element);
            expect(keys).toEqual(expect.arrayContaining(expectedKeys))
        });
    });
})
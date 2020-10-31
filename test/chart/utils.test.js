import { intros } from 'svelte/internal';
import {getAverageFromArray, getReadableDate, createPlotPoint, getRoundNumber, getPlotPointsByDate} from '../../src/chart/utils';

describe('getAverageFromArray', () => {
    it('should return an average of the given data', () => {
        let testData = [
            {output:10},
            {output:10},
            {output:10},
            {output:10},
            {output:10},
        ]
        expect(getAverageFromArray(testData, "output")).toBe(10);
    });
    it('should throw an error if that do not contain the given key', () => {
        let testData = [
            {output:10},
            {output:10},
            {notOutput:20},
            {output:10},
            {output:10},
        ];
        expect(() => {
            getAverageFromArray(testData, "output")
        }).toThrowError();
    });
    it('should handle an empty input by return a zero', () => {
        expect(getAverageFromArray([],"output")).toBe(0);
    })
});

describe('getReadableDate', () => {
    it('should return a date in the following format "YYYY-MM-DD', () => {
        let date = getReadableDate("2020-02-05 09:22 (CDT)");
        expect(date).toContain("2020-02-05");
    })
})

describe('createPlotPoint', () => {
    it('should return the first var as x and second as y', () => {
        expect(createPlotPoint("first", "second")).toStrictEqual({x:"first",y:"second"});
        expect(createPlotPoint({a:"a"},{b:"b"})).toStrictEqual({x:{a:"a"},y:{b:"b"}});
        expect(createPlotPoint(0,0)).toStrictEqual({x:0,y:0});
    })
});

describe('getRoundNumber', () => {
    it('should round a number and only have one decimal places', () => {
        expect(getRoundNumber(1.1)).toBe(1.1);
        expect(getRoundNumber(0.1)).toBe(0.1);
        expect(getRoundNumber(100.11)).toBe(100.1);
        expect(getRoundNumber(0)).toBe(0);
        expect(getRoundNumber(200)).toBe(200);
        expect(getRoundNumber(100.1243546574327)).toBe(100.1);
        expect(getRoundNumber(100.9783596886)).toBe(101);
    })
});

describe('getPlotPointsByDate', () => {
    
    it('should return plot points given the data', () => {
        let sampleData = [
            {output:100,date:'2020-09-25'},
            {output:100,date:'2020-09-25'},
            {output:100,date:'2020-09-25'}
        ]

        let yAxis = 'output';
        let xAxis = 'date';
        let result = getPlotPointsByDate(sampleData, yAxis, xAxis);
        expect(result).toHaveLength(sampleData.length);
        for (let index = 0; index < result.length; index++) {
            expect(result[index].y).toBe(sampleData[index][yAxis]);
            expect(result[index].x).toContain(sampleData[index][xAxis]);
        }
    });
    
    it('should return plot points given the data', () => {
        let sampleData = [
            {average:100,createdAt:'2020-09-25'},
            {average:100,createdAt:'2020-09-25'},
            {average:100,createdAt:'2020-09-25'}
        ]

        let yAxis = 'average';
        let xAxis = 'createdAt';
        let result = getPlotPointsByDate(sampleData, yAxis, xAxis);
        expect(result).toHaveLength(sampleData.length);
        for (let index = 0; index < result.length; index++) {
            expect(result[index].y).toBe(sampleData[index][yAxis]);
            expect(result[index].x).toContain(sampleData[index][xAxis]);
        }
    });

    it('should throw an error if data is malformed', () => {
        let sampleData = [
            {average:100,createdAt:'2020-09-25'},
            {average:100,createdAt:'2020-09-25'},
            {average:100,createdAt:'2020-09-25'}
        ]

        expect(()=>{getPlotPointsByDate(sampleData, 'output', 'date')}).toThrowError();
    })
})
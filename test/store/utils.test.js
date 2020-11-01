const { filterRidesByTitle } = require("../../src/store/utils")

describe('filterRidesByTitle', () => {
    let sampleData = [
        {title: "30 Min Tabata Ride"},
        {title: "30 Min Climb Ride"},
        {title: "30 Min HIIT Ride"},
        {title: "30 Min Tabata Ride"},
        {title: "30 Min Climb Ride"},
    ]
    it('should remove any rides that have a title matching the list of filters', () => {
        let filteredRideTitle = "Tabata";
        let result = filterRidesByTitle(sampleData, [filteredRideTitle])
        expect(result).toHaveLength(3);
        result.forEach(element => {
            expect(element).toEqual(expect.not.stringContaining(filteredRideTitle));
        });
    });
    it('should return an empty array if all items are filtered out', () => {
        let filteredRides = ["Tabata", "Climb", "HIIT"];
        let result = filterRidesByTitle(sampleData, filteredRides);
        console.log(result);
        expect(result).toHaveLength(0);
    });
    it('should leave any rides that have a title matching the list of filters if matching is sent as true', () => {
        let filteredRideTitle = "Tabata";
        let result = filterRidesByTitle(sampleData, [filteredRideTitle], true)
        expect(result).toHaveLength(2);
        result.forEach(element => {
            expect(element.title).toContain(filteredRideTitle);
        });
    });
})
export const colors = {
    red: "#e60000",
    pink: "#ff4d88",
    orange: "#e65c00",
    yellow: "#ffcc00",
    green: "#00cc00",
    teal: "#00cccc",
    blue: "#008ae6",
    violet: "#6666ff",
    purple: "#7300e6"
}
export const getColorArray = () => {
    let keys = Object.keys(colors);
    let array = [];
    keys.forEach(key => {
        array.push(colors[key]);
    })
    return array.reverse();
}



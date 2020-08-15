/*
*   has some colors
*   can generate a random hex color
*
*   generateColor()
*       Returns a random hex color value
*/

exports.colors = {
    error: "#f54242"
};

exports.generateColor = () => {return '#'+Math.floor(Math.random()*16777215).toString(16);};

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
exports.hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `RGB: ${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;     
};
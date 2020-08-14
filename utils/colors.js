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
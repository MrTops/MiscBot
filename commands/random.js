const { log } = require('../utils/log');
const { sendError } = require('../utils/defaultErrors');

//https://www.w3schools.com/js/js_random.asp
const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

exports.run = async (bot, message, args) => {
    if (args.length < 2) {
        sendError(`Needed at least 2 args, got ${args.length}`, 10, message.channel);
        return true;
    };
    if (isNaN(args[0]) || isNaN(args[1])) {
        sendError(`One or Both of the number(s) given were not numbers`, 10, message.channel);
        return true;
    };
    if (parseInt(args[0]) >= parseInt(args[1])) {
        sendError(`The first number given is bigger than or equal to the second.`, 10, message.channel);
        return true;
    };
    let round = args[2] ? (args[2].toLowerCase() == "true" ? true : false) : true 
    let min = parseInt(args[0]);
    let max = parseInt(args[1]);
    message.channel.send(`<@!${message.author.id}> your lucky number is ||${round ? Math.floor(random(min, max)) : random(min, max)}||`).catch(err=>log);
    return true;
};

exports.Config = {
    Command: "random",
    Usage: "random <number1 : number> <number2 : number (greater than number1)> <round? : true, false, or none>",
    Description: "Gives you a random number from number1 to number2"
};
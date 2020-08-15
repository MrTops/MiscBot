const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    message.channel.send(`I'm still working on this command so fuck off 'til I finish it`).catch(err=>log);
    return true;
};

exports.Config = {
    Command: "love",
    Aliases: ["❤️"],
    Usage: "love <target : name or mention>",
    Description: "Uses a advanced algorithm to calculate the level of love between two users."
};
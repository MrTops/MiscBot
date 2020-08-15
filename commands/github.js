const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    message.author.send(`Here's the github https://github.com/MrTops/MiscBot/`).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "github",
    Usage: "github",
    Description: "Need the github?"
};
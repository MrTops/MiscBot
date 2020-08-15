const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    message.channel.send(`<@!${message.author.id}> **NO U**`).catch(err=>log);
    return false;
};

exports.Config = {
    Command: "nou",
    Usage: "nou",
    Description: "Nou"
};
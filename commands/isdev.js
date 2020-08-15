const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    response = message.author.id == bot.DevId ? `<@!${message.author.id}> **is** the bot developer!` : `<@!${message.author.id}> is **NOT** the bot developer`
    message.channel.send(response).catch(err=>log);
    return true;
};

exports.Config = {
    Command: "isdev",
    Aliases: ["developer"],
    Usage: "isdev",
    Description: "Says if you're the bot developer, I added this just to confirm with server owners I am the bot developer."
};
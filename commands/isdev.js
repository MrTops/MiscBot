const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    response = message.author.id == bot.DevId ? "This user **is** the bot developer!" : "This user is **NOT** the bot developer"
    message.channel.send(response).catch(err=>log);
    return true;
};

exports.Config = {
    Command: "isdev",
    Aliases: ["developer"],
    Usage: "isdev",
    Description: "Says if you're the bot developer, I added this just to confirm with server owners I am the bot developer."
};
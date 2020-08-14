const { log } = require('../utils/log');

exports.run = async (bot, message, args) => {
    if (args.length <= 0) return;

    let response = "";
    args.forEach(arg=>response += `${arg} `);
    message.channel.send(response).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "say",
    Aliases: ["echo"],
    Usage: "say <sentence : words>",
    Description: "Tells you what you tell it."
};
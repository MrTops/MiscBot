exports.run = async (bot, message, args) => {
    message.channel.send('hello, daddy');
    return true;
};

exports.Config = {
    Command: "poll",
    Aliases: ["vote"],
    Usage: "poll",
    Description: "an unimplemented command"
};
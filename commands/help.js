exports.run = async (bot, message, args) => {
    message.channel.send('hello, daddy');

    return true;
};

exports.Config = {
    Command: "help",
    Usage: "help <page_number or command name : number, command_name, or none>",
    Description: "you need help?"
};
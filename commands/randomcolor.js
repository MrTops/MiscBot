const { log } = require('../utils/log');
const { MessageEmbed } = require('discord.js');
const { generateColor, hexToRgb } = require('../utils/colors');

exports.run = async (bot, message, args) => {
    let randomColor = generateColor();
    message.channel.send(new MessageEmbed()
        .setTitle(`Random Color for ${message.author.username}`)
        .setColor(randomColor)
        .setTimestamp()
        .setDescription(`hex value: ${randomColor}\n${hexToRgb(randomColor)}\n\nthe color is on the side just so ya know`)
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "random-color",
    Aliases: ["randomcolor", "randcolor"],
    Usage: "random-color",
    Description: "Generate a random color!"
};
const { sendError } = require('../utils/defaultErrors');
const { log } = require('../utils/log');
const { MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');

const pp = [
    "shlong",
    "pp",
    "peepee",
    "penis",
    "dicc",
    "dick"
];

const randomElement = array => {return array[Math.floor(Math.random() * array.length)]};

const genSize = () => {
    return `${Math.ceil(Math.random() * 10)} inch ${randomElement(pp)}`
};

const titles = [
    ' just got assblasted',
    ' has been fucked',
    ' has been gang blasted'
]

exports.run = async (bot, message, args) => {
    let recipient = message.mentions.members.first() || (await message.guild.members.fetch({ query: args[0], limit: 1 }).catch(err=>log)).first();
    if (!recipient) {
        sendError(`Could not find a valid recipient`, 5, message.channel);
        return true;
    };
    if (recipient.id == message.author.id) {
        sendError(`You need level 999,999,999 flexibility to preform this action`, 10, message.channel);
        return true;
    }

    let response = message.channel.send(
        new MessageEmbed()
        .setTitle(`${recipient.displayName}${randomElement(titles)}`)
        .setColor(generateColor())
        .setTimestamp()
        .setDescription(`<@!${recipient.id}> you've been fucked by <@!${message.author.id}> with his ${genSize()}`)
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "fuck",
    Usage: "fuck <recipient : mention, username>"
};
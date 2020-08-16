const { log } = require('../utils/log');
const { sendError } = require('../utils/defaultErrors');
const { MessageEmbed, GuildMember } = require('discord.js');
const { generateColor } = require('../utils/colors');

exports.run = async (bot, message, args) => {
    let target = message.mentions.members.first() || message.author;
    if (!target) {
        sendError(`Unable to find user`, 8, message.channel);
        return true;
    };

    if (target.user) target = target.user;

    message.channel.send(new MessageEmbed()
        .setTitle(`Information about ${target.username}`)
        .setColor(generateColor())
        .setTimestamp()
        .setDescription(`Username: ${target.username}\nIsBot?: ${target.bot}\nCreation: ${target.createdAt}\nAvatarURL: ${target.avatarURL()}${target.lastMessage ? `\nLast Message in \`\`${target.lastMessage.guild.name}\`\` content \`\`${target.lastMessage.content}\`\`` : ''}`)    
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "whom",
    Usage: "whom <target : mention, or nothing>",
    Description: "Highly detailed info about a user"
};
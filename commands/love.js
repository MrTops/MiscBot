const { log } = require('../utils/log');
const { sendError } = require('../utils/defaultErrors');
const { MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');

exports.run = async (bot, message, args) => {
    if (!args[0]) {
        sendError(`You did not give any arguments!`, 8, message.channel);
        return true;
    };
    let target = message.mentions.members.first() || await message.guild.members.fetch({ query: args[0], limit: 1 }).catch(err=>log);
    if (!target) {
        sendError(`Could not find the given user \`\`${args[0]}\`\``, 10, message.channel);
        return true;
    };

    let loveAmount = Math.round(Math.random() * 10);
    let loveString = `${"❤️".repeat(loveAmount)}${"🖤".repeat(10-loveAmount)}`
    
    let authorMember = message.guild.member(message.author)
    
    if (authorMember == target) {
        sendError(`Find someone else to love other than yourself`, 10, message.channel);
        return true;
    }

    message.channel.send(new MessageEmbed()
        .setTitle(`${authorMember.displayName} loves ${target.displayName} ${loveAmount*10}%`)
        .setTimestamp()
        .setColor(generateColor())
        .setDescription(loveString)
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "love",
    Aliases: ["❤️"],
    Usage: "love <target : name or mention>",
    Description: "Uses a advanced algorithm to calculate the level of love between two users."
};
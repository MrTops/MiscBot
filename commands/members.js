const { log } = require('../utils/log');
const { Collection, MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');

exports.run = async (bot, message, args) => {
    let description = "";
    let usersOfLetters = new Collection();
    let bots = 0;
    let members = 0;
    let allMembers = await message.guild.members.fetch().catch(err=>log);
    if (!allMembers) {
        return false;
    };
    allMembers.array().forEach(member => {
        if (member.user.bot) {
            bots++;
        }else{
            members++;
        }
        if (!usersOfLetters.get(member.displayName[0])) usersOfLetters.set(member.displayName[0], 0);
        usersOfLetters.set(member.displayName[0], usersOfLetters.get(member.displayName[0]) + 1);
    });
    description = `Members: ${members}\nBots: ${bots}\n\nNumber of users with the same first letter in their name\n`;
    usersOfLetters.sort().forEach((value, key) => {
        log(key)
        description += `"${key}": ${value}\n`
    });

    message.channel.send(new MessageEmbed()
        .setTitle(`Member info`)
        .setColor(generateColor())
        .setTimestamp()
        .setDescription(description)
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "members",
    Usage: "members",
    Description: "You need to know how many members you have, I gotchu."
};
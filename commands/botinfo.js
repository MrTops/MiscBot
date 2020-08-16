const { log } = require('../utils/log');
const { MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');

exports.run = async (bot, message, args) => {
    let memberCount = 0;
    let largeServers = 0;
    bot.guilds.cache.array().forEach(guild => {memberCount+=guild.memberCount; if(guild.large){largeServers++;};});
    message.channel.send(new MessageEmbed()
        .setTitle(`Information about the bot`)
        .setTimestamp()
        .setAuthor(bot.user.username, bot.user.avatarURL(), 'https://github.com/MrTops/MiscBot')
        .setColor(generateColor())
        .setDescription(`Servers: ${bot.guilds.cache.array().length}\nMembers: ${memberCount}\nLarge Servers*: ${largeServers}\nBot Ping: ${bot.ws.ping}\nShards: **sharding is not on at the moment**\n\n* = large means 50 members or more`)
    ).catch(err=>log);

    return true;
};

exports.Config = {
    Command: "botinfo",
    Usage: "botinfo",
    Description: "Information about the bot if you care."
};
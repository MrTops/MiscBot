/*
*   used to generate message embeds that are errors
*
*   generateError(errorMessage)
*       returns MessageEmbed
*       generates a generic error message embed with color red and the given errorMessage
*
*   sendError(errorMessage, deleteTime, channel)
*       sends a generated error message then deletes after the given time to the given channel
*/

const { MessageEmbed } = require('discord.js');
const { colors } = require('./colors');
const { log } = require('./log');

exports.generateError = errorMessage => {
    return (
        new MessageEmbed()
        .setTitle(`An error occurred`)
        .setColor(colors.error)
        .setTimestamp()
        .setDescription(errorMessage)
    )
};

exports.sendError = async (errorMessage, deleteTime, channel) => {
    let message = await channel.send(
        exports.generateError(errorMessage).setFooter(`will delete in ${deleteTime} seconds`)
    ).catch(err=>log);
    if (!message) return;
    message.delete({ timeout: deleteTime*1000 }).catch(err=>log);
};
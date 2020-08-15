const { sendError } = require('../utils/defaultErrors');
const { MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');
const { log } = require('../utils/log');

const commandsPerPage = 10;

const commandPages = bot => {
    let rtnArray = [];
    let pageIndex = 0;
    let currentIndex = 0;
    bot.Commands.array().forEach(command => {
        if (currentIndex >= commandsPerPage) {
            pageIndex++;
            currentIndex = 0;
        };
        if (!rtnArray[pageIndex]) rtnArray[pageIndex] = [];
        rtnArray[pageIndex][currentIndex] = command;
        currentIndex++;
    });
    return rtnArray;
};

exports.run = async (bot, message, args) => {
    if (!args[0]) {
        sendError('Did not receive any arguments.', 8, message.channel);
        return true;
    };

    if (isNaN(args[0])) {
        // specific command
        if (args[0].toLowerCase() == "all") {
            let i = 1;
            commandPages(bot).forEach(page => {
                const currentPageEmbed = new MessageEmbed()
                    .setColor(generateColor())
                    .setTimestamp()
                    .setAuthor(bot.user.username, bot.user.avatarURL(), 'https://github.com/MrTops/MiscBot')
                    .setTitle(`Page #${i}`);
                let description = "";
                page.forEach(command => {
                    let config = command.Config
                    description += `Command: ${config.Command}\nDescription: ${config.Description}\nUsage: ${config.Usage}${config.Aliases ? `\nUsage: ${config.Aliases.join(', ')}` : ''}\n\n`;
                });
                currentPageEmbed.setDescription(description);
                message.author.send(currentPageEmbed).catch(err=>log)
                i++;
            });
        }else {
            if (!bot.Commands.get(args[0]) && !bot.Aliases.get(args[0])) {
                sendError(`Was unable to find the command \`\`${args[0]}\`\``, 8, message.channel);
                return true;
            };
            let config = (bot.Commands.get(args[0]) || bot.Aliases.get(args[0])).Config;
             if (!(await message.author.send(new MessageEmbed()
                .setColor(generateColor())
                .setTimestamp()
                .setAuthor(bot.user.username, bot.user.avatarURL(), 'https://github.com/MrTops/MiscBot')
                .setTitle(`Info for \"${args[0]}\" command.`)
                .setDescription(`Command: ${config.Command}\nDescription: ${config.Description}\nUsage: ${config.Usage}${config.Aliases ? `\nUsage: ${config.Aliases.join(', ')}` : ''}`)
            ).catch(err=>log))) {
                sendError(`Was unable to send dm, are your dms off??`, 10, message.channel)
            };
            return true;
        };
    }else if(!isNaN(args[0])) {
        // pages mode
        if (Math.floor(parseInt(args[0])) != parseInt(args[0])) {
            sendError(`Must be a whole number!`, 8, message.channel);
            return true;
        }
        let pages = commandPages(bot);
        args[0] = parseInt(args[0]);
        if (!pages[args[0]-1]) {
            sendError(`There is not a page \`\`${args[0]}\`\``, 8, message.channel);
            return true;
        }
        const currentPageEmbed = new MessageEmbed()
            .setColor(generateColor())
            .setTimestamp()
            .setAuthor(bot.user.username, bot.user.avatarURL(), 'https://github.com/MrTops/MiscBot')
            .setTitle(`Page #${args[0]}/${pages.length}`);
        let description = "";
        pages[args[0]-1].forEach(command => {
            let config = command.Config;
            description += `Command: ${config.Command}\nDescription: ${config.Description}\nUsage: ${config.Usage}${config.Aliases ? `\nUsage: ${config.Aliases.join(', ')}` : ''}\n\n`;
        });
        currentPageEmbed.setDescription(description);
        if (!(await message.author.send(currentPageEmbed).catch(err=>log))) {
            sendError(`Was unable to send dm, are your dms off??`, 10, message.channel);
            return true;
        };
    }else {
        // just a check but shouldn't be called
        sendError('Was unable to parse argument, if this persists please contact a developer', 10, message.channel);
        return true;
    }

    return true;
};

exports.Config = {
    Command: "help",
    Usage: "help <page_number or command name : number, command_name, or none>",
    Description: "you need help?"
};
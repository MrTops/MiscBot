const { sendError } = require('../utils/defaultErrors');
const { log } = require('../utils/log');
const { MessageEmbed } = require('discord.js');
const { generateColor } = require('../utils/colors');

const nums = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']

exports.run = async (bot, message, args) => {
    args = message.content.substr(message.content.indexOf(' ')+1).split('"').filter(obj => obj != '' && obj != ' ');
    if (args.length < 2 || args.length > 6) {
        sendError(`Too few or Too many arguments, got ${args.length} arguments, wanted at least 2 but not over 6.`, 10, message.channel);
        return true;
    };

    let prompt = args.shift();

    const responseEmbed = new MessageEmbed()
        .setTitle(prompt)
        .setTimestamp()
        .setColor(generateColor())
        .setAuthor(message.author.username, message.author.avatarURL());
    
    let description = '';

    let i = -1;
    args.forEach(arg => {i++; description += `${nums[i] || 'ERROR'} = ${arg}\n`;});
    i=-1;
    responseEmbed.setDescription(description);
    let sent = (await message.channel.send(responseEmbed).catch(err=>log));
    if (!sent) return false;
    args.forEach(async () => {i++; await sent.react(nums[i]).catch(err=>log);});

    return true;
};

exports.Config = {
    Command: "poll",
    Aliases: ["vote"],
    Usage: "poll \"<prompt : sentence>\" \"<answer 1 : sentence>\" \"<answer 2 : nothing, sentence>\" \"<answer 3 : nothing, sentence>\" \"<answer 4 : nothing, sentence>\" \"<answer 5 : nothing, sentence>\"",
    Description: "ask the community a question, you cannot put a \" in side of the \"\'s, please you \' for that\nexample usage:\n\`\`..poll \"This is a test question\" \"Yes\" \"No\" \"Maybe\"\`\`"
};
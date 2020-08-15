/*
*   Loads the bot and handles server shizz
*/

//modules
const { Client, MessageEmbed, Collection } = require('discord.js');
const { log } = require('./utils/log');
const { colors, generateColor } = require('./utils/colors');
const { readFileSync, readdir } = require('fs');

//consts
const bot = new Client({
    'disableMentions': 'everyone'
});
const config = require('./config.json');
const token = config.Token;
const prefix = config.Prefix;
bot.Prefix = prefix;

//Load commands
bot.Commands = new Collection();
bot.Aliases = new Collection();

readdir('./commands', (err, files) => {
    if (err) log(err);
    log(`loading ${files.length} commands.`);
    files.forEach(file => {
        log(`   loading ${file} command`);
        let command = require(`./commands/${file}`);
        let config = command.Config;
        bot.Commands.set(config.Command, command);
        if (config.Aliases) {
            config.Aliases.forEach(alias => {
                log(`       alias ${alias}`);
                bot.Aliases.set(alias, command);
            });
        };
    });
    log(`Done loading commands`);
});

//events
bot.on('ready', async () => {
    log(`bot ready on ${bot.guilds.cache.array().length} servers :p`);
    bot.user.setActivity('"..help" 4 help | must have dms open!', { 'type': 'PLAYING' });
});

bot.on('message', async (message) => {
    if (message.channel.type != "text") return;
    if (message.author.bot) return;
    if (message.content.startsWith(`<@!${bot.user.id}>`)) {
        return;
    };

    let args = message.content.split(' ');
    if (args.length < 1) return;
    if (!args[0].startsWith(prefix)) return;
    args[0] = args[0].substr(2);
    let command = args.shift().toLowerCase();

    let commandObject = bot.Commands.get(command) || bot.Aliases.get(command);
    if (!commandObject) return;
    let del = await commandObject.run(bot, message, args);
    if (del == true) {
        message.delete().catch(err=>log);
    };
});

//login
bot.login(token);
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use('/favicon.ico', express.static('./app/images/favicon032x32.png'));


// connect to the bot
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
    if (msg.content === 'marco') {
        msg.reply('polo');

    } else if (msg.content.startsWith('!alarm')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`User Selected: ${taggedUser.username}`);

            const taggedUsername = taggedUser.username;

        }
    } else if (msg.content.startsWith('!timer')) {

        let currentTimer = 0;
        const bodyText = msg.content.split(" ");

        // decied whether its @everyone or @person command
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();

            if (bodyText[3].includes('m')) {
                let minutes = bodyText[3].split("m");
                minutes = Number(minutes[0]);
                currentTimer = (minutes * 60) * 1000;
                
                setTimeout(() => {
                    msg.channel.send(`${taggedUser} Times UP : ${(currentTimer / 1000) / 60}`)
                }, currentTimer);

            } else if (bodyText[3].includes('s')) {
                let seconds = bodyText[3].split("s");
                seconds = Number(seconds[0]);
                currentTimer = (seconds * 1000);

                setTimeout(() => {
                    msg.channel.send(` ${taggedUser}  Times UP : ${currentTimer / 1000}s`);
                }, currentTimer);

            }

            userSelected = true;
        } else {
            if (bodyText[1].includes('m')) {
                let minutes = bodyText[1].split("m");
                minutes = Number(minutes[0]);
                currentTimer = (minutes * 60) * 1000;

                setTimeout(() => {
                    msg.channel.send(`@everyone Times UP : ${(currentTimer / 1000) / 60}`)
                }, currentTimer);

            } else if (bodyText[1].includes('s')) {
                let seconds = bodyText[1].split("s");
                seconds = Number(seconds[0]);
                currentTimer = (seconds * 1000);

                setTimeout(() => {
                    msg.channel.send(`@everyone Times UP : ${currentTimer / 1000}s`);
                }, currentTimer);

            }
        }


    }


});

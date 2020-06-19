require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json()); 




// config db 
const dbConfig = require("./app/config/mongodb.config");

// import model 
const Alarm  = require("./app/models/alarm.model");

mongoose.Promise = global.Promise;


// connenct to DB
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

  }).catch((err) => {
    console.log("could not connect to MongoDB");
    process.exit();
  });

// connect to the bot
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
  if (msg.content === 'marco') {
    msg.reply('polo');

  } else if (msg.content.startsWith('!alarm')) {
    if(msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`User Selected: ${taggedUser.username}`);

        const taggedUsername = taggedUser.username;
        const bodyText = msg.content.split(" ");
        const alarmTime = bodyText[2];
        const alarmDate = bodyText[3];
        const alarmMsg = bodyText[4];
      
        // convert alarm time and date 
        const Hr = alarmTime.slice(0, 2);
        const Min = alarmTime.slice(3);

        const Month = alarmDate.slice(0,2);
        const Year = alarmDate()
        const a = new Date();
        
        // create alarm obj
       const alarmNew = new Alarm( 
         taggedUsername, 

        );


        console.log(alarmTime);
        console.log(alarmDate);
        console.log(alarmMsg);

        
  }
} else if (msg.content.startsWith('!timer')) {

        let currentTimer = 0; 
        const bodyText = msg.content.split(" ");

        if(msg.mentions.users.size) {
             const taggedUser = msg.mentions.users.first();
            
             console.log(bodyText);

             if (bodyText[3].includes('m')) {
                let minutes = bodyText[3].split("m");
                
                minutes = Number(minutes[0]);
            
                currentTimer = (minutes * 60) * 1000;
                setTimeout( () =>{
                    msg.channel.send(`${taggedUser} Times UP STOP: ${(currentTimer/1000)/60}`)
                }, currentTimer);
                
            } else if(bodyText[3].includes('s')){
                let seconds = bodyText[3].split("s");
                seconds = Number(seconds[0]);
                
                currentTimer = (seconds * 1000);
               setTimeout( ()=> {
                msg.channel.send(` ${taggedUser}  Times UP STOP: ${currentTimer/1000}s`);
               }, currentTimer);
               
            }

             userSelected = true;
        }else{
            if (bodyText[1].includes('m')) {
                let minutes = bodyText[1].split("m");
                minutes = Number(minutes[0]);
                
                currentTimer = (minutes * 60) * 1000;
                setTimeout( () =>{
                    msg.channel.send(`@everyone Times UP STOP: ${(currentTimer/1000)/60}`)
                }, currentTimer);
                
            } else if(bodyText[1].includes('s')){
                let seconds = bodyText[1].split("s");
                seconds = Number(seconds[0]);
                
                currentTimer = (seconds * 1000);
               setTimeout( ()=> {
                msg.channel.send(`@everyone Times UP STOP: ${currentTimer/1000}s`);
               }, currentTimer);
               
            }       
        }

      
}

 
});

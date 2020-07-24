const Discord = require('discord.js');
const ms = require('ms');

module.exports = class BaseReminder{
    constructor(reminder, user, message, time, text){
        this.reminder = reminder;
        this.user = user;
        this.message = message;
        this.time = time;
        this.text = text
    }
    async create(){

        let embed = new Discord.MessageEmbed().setTitle(`⏱Reminder`).setFooter(`Reminder for ${this.user.username}`)
        .setDescription(`${this.user}\n**Reminding you for:**\n\n\`${this.text}\``)

        let regH = /^[0-24](h)$/g
        let regM = /^[0-60](m)$/g
        let regS = /^[0-60](s)$/g

        let seconds = this.time.match(regS);
        let minutes = this.time.match(regM);
        let hours = this.time.match(regH);

        seconds = seconds ? parseInt(seconds) * 1000 : 0;
        minutes = minutes ? parseInt(minutes) * 60 * 1000 : 0;
        hours = hours ? parseInt(hours) * 3600 * 1000 : 0;

        let res = Math.floor(seconds + minutes + hours)

        this.reminder = setTimeout(() => {
            this.message.channel.send(this.user).then(m=>m.delete({timeout: 50}))
            this.message.channel.send(embed);
        }, res);

    }
    async stop(reminder){
        return clearTimeout(this.reminder);
    }
    async checkTimeLeft(){
    }
}
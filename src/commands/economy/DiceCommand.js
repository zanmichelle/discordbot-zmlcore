const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const { number } = require('mathjs');

module.exports = class DiceCommand extends BaseCommand {
    constructor() {
        super('dice', 'economy', [],'Roll dice...', [], "dice <number>", ['SEND_MESSAGES'], 60);
    }

    async run(client, message, args) {
        let numbers = {
            "one":{number:1,emoji:"1️⃣",text:"one"},
            "two":{number:2,emoji:"2️⃣",text:"two"},
            "three":{number:3,emoji:"3️⃣",text:"three"},
            "four":{number:4,emoji:"4️⃣",text:"four"},
            "five":{number:5,emoji:"5️⃣",text:"five"},
            "six":{number:6,emoji:"6️⃣",text:"six"}
        }
        let options = ["one","two","three","four","five","six"]
        try{
            if(!args[0] || isNaN(args[0]) || !args[1] || isNaN(args[1])) return message.channel.send(`Specify a number and bet on the number.`);
            const number = parseInt(args[0]);
            if(number>14) return message.channel.send(`You can't choose a number higher than 12.`);

            let data = await client.database.prepare(`SELECT * FROM economy WHERE guild_id=? AND member=?`).get(message.guild.id, message.author.id);
            if(!data) await client.database.prepare(`INSERT INTO economy(guild_id,member) VALUES(?,?)`).run(message.guild.id, message.author.id);

            const bet = parseInt(args[1]);
            let user =  await client.database.prepare('SELECT * FROM economy WHERE guild_id=? AND member=?').get(message.guild.id,message.author.id);
            console.log(user)
            if(bet>user.money) return message.channel.send(`You don't have enough money.`)
            if(this.cooldown !== 0 && this.cooldown) client.cooldowns.set(`${message.guild.id}_${message.author.id}-${this.name}`, new client.timer(function() {client.cooldowns.delete(`${message.guild.id}_${message.author.id}-${this.name}`)}, this.cooldown*1000));
            const diceThrow = throwDice()
            console.log(diceThrow)
        }catch(err){console.log('[ERROR] - at DICE', err.stack)}
        function throwDice() {
            try{
                let together = []
                let sum=0
                for (let i = 0; i>2;i++){
                    let r= numbers[options[Math.floor(Math.random() * Math.floor(6))]];
                    together.push(r.emoji);
                    sum = sum+r.number;

                    console.log(r)
                }
                return(sum,together)
                
            }catch(err){console.log(`[ERROR] at command: DICE, function throwDice();\n`,err.stack);return message.channel.send(`There was an error when throwing dice...`)} 
        }
    }
    
}
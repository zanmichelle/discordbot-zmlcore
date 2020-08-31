const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class RpsCommand extends BaseCommand {
    constructor() {
        super('rps', 'fun', [],'Classic game ⛰ 📄 ✂️', [], "rps <rock/paper/scissors>", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            
            let valid = ["rock","paper","scissors"]
            if(!args[0] || !valid.includes(args[0].toLowerCase())) return message.channel.send(`Supply your choice: \`${valid.join(", ")}\``)
            let embed = new MessageEmbed().setTitle(`${valid.join(" ")}`);
            let d = args[0].toLowerCase();
            let bd = valid[Math.floor(Math.random() * Math.floor(3))]

            if(d==bd) return message.channel.send(embed.setDescription(`Noone won, our choice was the same...`));
            if(d==valid[0] && bd == valid[1]) return message.channel.send(embed.setDescription(`**I choose 📄 so I've won!**`))
            else if(d==valid[1] && bd == valid[2]) return message.channel.send(embed.setDescription(`**I choose ✂️ so I've won!**`))
            else if(d==valid[2] && bd == valid[0]) return message.channel.send(embed.setDescription(`**I choose ⛰ so I've won!**`))
            else return message.channel.send(embed.setDescription(`I choose \`${bd}\` so **you've won**!`));
        }catch(err){console.log('[ERROR] - at RPS', err.stack)}
    }
}
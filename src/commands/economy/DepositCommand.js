const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const { parse } = require('mathjs');

module.exports = class DepositCommand extends BaseCommand {
    constructor() {
        super('deposit', 'economy', ['dep'],'Desposit money to the bank.', [], "deposit", ['SEND_MESSAGES'], 15);
    }

    async run(client, message, args) {
        try{
            if(!args[0] || isNaN(args[0]) && args[0].toLowerCase() !== 'all') return message.channel.send(`Invalid number.`);
            let user = await db.prepare('SELECT * FROM economy WHERE guild_id=? AND member=?').get(message.guild.id,message.author.id);
            if(!user) {db.prepare('INSERT INTO economy(guild_id,member) VALUES(?,?)').run(message.guild.id,message.author.id); return message.channel.send(`Creating your economy profile, re run the command!`);}

            console.log(user)
            let bank_cache;
            let money_cache;
            if(args[0].toLowerCase() == 'all'){
                money_cache = 0
                bank_cache = user.bank + user.money;

                db.prepare(`UPDATE economy SET money=?,bank=? WHERE guild_id=? AND member=?`).run(money_cache,bank_cache,message.guild.id,message.author.id);
                return message.channel.send({embed: new MessageEmbed().setFooter(`💰 Deposited all your money to the bank.`).setColor('#007700')});
            }
            else{
                money_cache = user.money - parseInt(args[0]);
                bank_cache = user.bank + parseInt(args[0]);

                db.prepare(`UPDATE economy SET money=?,bank=? WHERE guild_id=? AND member=?`).run(money_cache,bank_cache,message.guild.id,message.author.id);
                return message.channel.send({embed: new MessageEmbed().setFooter(`🏦 Deposited $${args[0]} to the bank.`).setColor('#007700')});
            }
            


        }catch(err){console.log('[ERROR] - at DEPOSIT\n', err.stack)}
    }
}
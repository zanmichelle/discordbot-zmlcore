const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class BuyCommand extends BaseCommand {
    constructor() {
        super('buy', 'shop', [],'This is command description.', [], "buy", ['REQUIRED_PERMS'], 'cooldown(optional)');
    }

    async run(client, message, args) {
        try{
            if(!args || !args.length) return message.channel.send(`I don't read your mind, specify the item.`);
            let items = await client.shop.get(message.guild.id);
            let index = items.findIndex(element => element.item == args.join(" "));

            if(index < 0) return message.channel.send(`Item doesn't exists.`);
            let item = items[index];
            if(message.member._roles.includes(item.role)) return message.channel.send(`You already have this item/role!`);
            
            let {money} = await db.prepare(`SELECT * FROM economy WHERE guild_id=? AND member=?`).get(message.guild.id, message.member.id);
            if(item.price > money) return message.channel.send(`You don't have enough money, try earning more by working.`);
            
            message.member.roles.add(item.role).then(()=>{
                db.prepare('UPDATE economy SET money=? WHERE guild_id=? AND member=?').run(money-item.price, message.guild.id,message.member.id);
                return message.channel.send(`You have successfully bought **${item.item}** for **$${item.price}**.`);
            }).catch(e=>{
                return message.channel.send(`Couldn't give your role, but don't worry I didn't take your money.`);
            });
        }catch(err){console.log('[ERROR] - at BUY', err.stack)}
    }
}
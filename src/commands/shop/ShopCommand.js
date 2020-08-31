const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class ShopCommand extends BaseCommand {
    constructor() {
        super('shop', 'shop', [],'This is command description.', [], "shop", ['REQUIRED_PERMS'], 'cooldown(optional)');
    }

    async run(client, message, args) {
        try{
            let shop = db.prepare('SELECT * FROM shop WHERE guild_id=?').all(message.guild.id);
            let array=[];

            shop.forEach(item => {
                array.push(`$${item.price} **<@&${item.role}>** - *${item.item}*`);
            });

            let embed = new MessageEmbed()
            .setTitle(`🛒 Server shop:`)
            .setDescription(array.join("\n"))
            .setTimestamp(new Date());

            return message.channel.send(embed);
        }catch(err){console.log('[ERROR] - at SHOP', err.stack)}
    }
}
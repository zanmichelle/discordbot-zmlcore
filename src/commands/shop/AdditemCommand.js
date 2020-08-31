const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class AdditemCommand extends BaseCommand {
    constructor() {
        super('additem', 'shop', [],'Add items to guild shop.', ['MANAGE_GUILD'], "additem <falgs> [-i item name/short description, -p price, -r role ID or name]", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            let total = db.prepare('SELECT * FROM shop WHERE guild_id=?').all(message.guild.id);
            let guild_config = client.settings.get(message.guild.id);
            if(total.length >= 8 && guild_config.premium == 'false') return message.channel.send(`Non premium guilds may only sell 5 items at once.\n\nJoin our support server and buy premium.`);
            let argu = args.join(" ")
            let item_match = argu.match(/-i [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g);
            let role_match = argu.match(/-r [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g);
            let price_match = argu.match(/-p [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g);

            if(!item_match || !role_match || !price_match) return message.channel.send(`You have to specify all flags in order to sucessfully ad an item.`);

            let item = item_match[0].split(/ +/g).slice(1).join(" ");
            let price = price_match[0].split(/ +/g).slice(1).join(" ").replace(/ +/g, "");
            let role = role_match[0].split(/ +/g).slice(1).join(" ");

            item = item.endsWith(" ") ? item.slice(0,-1) : item;
            role = role.endsWith(" ") ? role.slice(0,-1) : role;
            
            console.log(`${item}\n${role}\n${price}`);

            role = message.guild.roles.cache.get(role) || message.guild.roles.cache.find(r=> r.name === role);
            if(!role) return message.channel.send(`Role wasn't found.`);

            if(role.rawPosition >= message.guild.member(client.user).roles.highest.rawPosition) return message.channel.send(`I can't assign roles higher than mine to buyers.\n\nChoose lower role or give me higher.`);
            if(isNaN(price) || price > 10000000) return message.channel.send(`Price must be a number and smaller than 10M.`);
            
            db.prepare('INSERT INTO shop(guild_id, item, role, price) VALUES(?,?,?,?)').run(message.guild.id, item, role.id, price)
            return message.channel.send(`Successfully added **${item}** to guild shop!\n\nYou can now buy it with **$${price}**.`);

        }catch(err){console.log('[ERROR] - at ADDITEM', err.stack)}
    }
}
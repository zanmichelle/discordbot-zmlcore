const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class RemoveitemCommand extends BaseCommand {
    constructor() {
        super('removeitem', 'shop', [],'This is command description.', [], "removeitem", ['REQUIRED_PERMS'], 'cooldown(optional)');
    }

    async run(client, message, args) {
        try{
            if(!args[0] || !args.length) return message.channel.send(`You need to specify item to remove.`);

            let item = args[0]
            let check = db.prepare('SELECT * FROM shop WHERE guild_id=? AND role=?').all(message.guild.id,item);
            if(!check || !check.length) return message.channel.send(`Item with role \`${item}\` was not found.`);

            db.prepare('DELETE FROM shop WHERE guild_id=? AND role=?').run(message.guild.id, item);
            return message.channel.send(`\`${item}\` was removed from guild shop.`);
        }catch(err){console.log('[ERROR] - at REMOVEITEM', err.stack)}
    }
}
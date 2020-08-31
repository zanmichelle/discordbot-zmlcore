const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class GendCommand extends BaseCommand {
    constructor() {
        super('gend', 'giveaways', [],'This is command description.', [], "gend", ['REQUIRED_PERMS']);
    }

    async run(client, message, args) {
        try{
            if(!args[0] || isNaN(args[0])) return message.channel.send(`You must enter a valid giveaway id.`);

            let giveaway = await db.prepare('SELECT * FROM giveaways WHERE message=?').get(args[0]);
            if(!giveaway) return message.channel.send(`Not a valid giveaway.`);

            let msg = await client.channels.cache.get(giveaway.channel).messages.fetch(giveaway.message);
            msg.delete();
            db.prepare('UPDATE giveaways SET ended=\'true\' WHERE message=?').run(giveaway.message);
            message.channel.send(`Giveaway ended!`).then(m=>m.delete({timeout: 5000}));
        }catch(err){console.log('[ERROR] - at GEND', err.stack)}
    }
}
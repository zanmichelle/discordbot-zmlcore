const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class DeactivateCommand extends BaseCommand {
    constructor() {
        super('deactivate', 'admin', [],'This is command description.', [], "deactivate", ['REQUIRED_PERMS'], 'cooldown(optional)');
    }

    async run(client, message, args) {
        try{
            if(message.author.id !== '304870309779996672') return
            let temp = client.settings.get(message.guild.id);
            db.prepare('UPDATE guilds SET premium=\'false\', activated_by=\'null\' WHERE guild_id=?').run(message.guild.id);
            message.channel.send(`**SERVER has no longer Amolid premium features**`);
            temp["premium"] = 'true';
            client.settings.set(message.guild.id,temp);
        }catch(err){console.log('[ERROR] - at DEACTIVATE', err.stack)}
    }
}
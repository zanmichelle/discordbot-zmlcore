const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class ActivateCommand extends BaseCommand {
    constructor() {
        super('activate', 'admin', [],'', ['SEND_MESSAGES'], "activate", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(message.author.id !== '304870309779996672') return
            let temp = client.settings.get(message.guild.id);
            db.prepare('UPDATE guilds SET premium=\'true\', activated_by=? WHERE guild_id=?').run(message.author.id,message.guild.id);
            message.channel.send(`🎉 **SERVER has now Amolid premium features** 🎉`);
            temp["premium"] = 'true';
            client.settings.set(message.guild.id,temp);
        }catch(err){console.log('[ERROR] - at ACTIVATE', err.stack)}
    }
}
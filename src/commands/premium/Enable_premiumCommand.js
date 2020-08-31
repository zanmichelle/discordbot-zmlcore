const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class Enable_premiumCommand extends BaseCommand {
    constructor() {
        super('enable_premium', 'premium', [],'This is command description.', [], "enable_premium", ['REQUIRED_PERMS'], 'cooldown(optional)');
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at ENABLE_PREMIUM', err.stack)}
    }
}
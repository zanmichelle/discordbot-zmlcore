const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class RerollCommand extends BaseCommand {
    constructor() {
        super('reroll', 'giveaways', [],'This is command description.', [], "reroll", ['REQUIRED_PERMS']);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at REROLL', err.stack)}
    }
}
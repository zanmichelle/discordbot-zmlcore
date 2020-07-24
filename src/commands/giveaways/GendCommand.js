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
            
        }catch(err){console.log('[ERROR] - at GEND', err.stack)}
    }
}
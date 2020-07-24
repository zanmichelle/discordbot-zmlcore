const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const BaseGiveaway = require('../../utils/structures/BaseGiveaway');

module.exports = class GcreateCommand extends BaseCommand {
    constructor() {
        super('gcreate', 'giveaways', [],'This is command description.', ['MANAGE_GUILD','MANAGE_CHANNELS'], "gcreate", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            BaseGiveaway.create()
        }catch(err){console.log('[ERROR] - at GCREATE', err.stack)}
    }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class WorkCommand extends BaseCommand {
    constructor() {
        super('work', 'economy', [],'You will earn some extra money if you work', [], 'work', ['SEND_MESSAGES'], 18000);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at WORK', err.stack)}
    }
}
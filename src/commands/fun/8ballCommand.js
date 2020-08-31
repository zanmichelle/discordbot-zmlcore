const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class EightballCommand extends BaseCommand {
    constructor() {
        super('8ball', 'fun', ['8b'],'8ball will give u an answer.', [], "8ball <question>", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at 8BALL\n', err.stack)}
    }
}
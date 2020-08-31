const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class RobCommand extends BaseCommand {
    constructor() {
        super('rob', 'economy', [],'Rob someone.', [], "rob <@member>", ['SEND_MESSAGES'], 7200);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at ROB', err.stack)}
    }
}
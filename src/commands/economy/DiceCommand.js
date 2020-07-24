const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class DiceCommand extends BaseCommand {
    constructor() {
        super('dice', 'economy', [],'Roll dice...', [], "dice <number>", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at DICE', err.stack)}
    }
}
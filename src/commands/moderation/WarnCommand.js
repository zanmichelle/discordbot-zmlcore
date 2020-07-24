const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', [],'Gives member a warn.', ['ADMINISTATOR','MANAGE_GUILD'], "warn <member> [reason]",['MANAGE_GUILD', 'MANAGE_MESSAGES']);
  }

  async run(client, message, args) {
    try{
      
    }catch(err){console.log(`[ERROR] - at WARN`, err.stack)}
  }
}
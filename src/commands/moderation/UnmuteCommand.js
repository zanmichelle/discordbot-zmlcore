const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', [],'Unmutes a muted member.', ['MUTE_MEMBERS','MANAGE_MESSAGES'], "template",['MANAGE_ROLES']);
  }

  async run(client, message, args) {
    try{

    }catch(err){console.log(`[ERROR] - at UNMUTE`, err.stack)}
  }
}
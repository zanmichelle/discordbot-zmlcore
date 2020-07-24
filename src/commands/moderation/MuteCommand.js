const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', [],'Mutes a member - he can not type/speak.', ['MUTE_MEMBERS','MANAGE_MESSAGES'], "mute <member> [reason]",['MANAGE_ROLES','MANAGE_GUILD']);
  }

  async run(client, message, args) {
    try{

    }catch(err){console.log(`[ERROR] - at MUTE`, err.stack)}
  }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', [],'Mutes a member - he can not type/speak.', ['MUTE_MEMBERS','MANAGE_MESSAGES'], "mute <member> [reason]",['MANAGE_ROLES','MANAGE_GUILD']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Mention a member you would like to mute.`);

      let member = message.mentions.members.first() || message.guild.member(client.users.cache.get(args[0])) || client.users.cache.get(args[0].replace(/[@#<>!&]+/g));
      if(!member) return message.channel.send(`Invalid mention/ID.`);

      message.guild.roles.create
    }catch(err){console.log(`[ERROR] - at MUTE`, err.stack)}
  }
}
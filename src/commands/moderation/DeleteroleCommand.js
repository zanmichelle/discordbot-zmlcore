const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');

module.exports = class DeleteroleCommand extends BaseCommand {
  constructor() {
    super('deleterole', 'moderation', ['dr'],'Deletes a selected role.', ['MANAGE_ROLES','MANAGE_GUILD'], "deleterole <rolename> [reason]",['MANAGE_ROLES']);
  }

  async run(client, message, args) {
    try{}catch(err){console.log(`[ERROR] - at DELETEROLE`, err.stack)}
  }
}
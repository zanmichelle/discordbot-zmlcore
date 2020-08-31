const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');

module.exports = class TemplateCommand extends BaseCommand {
  constructor() {
    super('command', 'moderation', ['cmd'],'Create custom commands.', ['ADMINISTRATOR'], "command <add/remove> <command_nam> <output>",['SEND_MESSAGES']);
  }

  async run(client, message, args) {
    try{

    }catch(err){console.log(`[ERROR] - at command`, err.stack)}
  }
}
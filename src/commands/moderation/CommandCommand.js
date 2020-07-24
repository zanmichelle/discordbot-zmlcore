const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');

module.exports = class TemplateCommand extends BaseCommand {
  constructor() {
    super('template', 'category', ['aliases'],'This is command description.', ['ADMINISTATOR','SOME_OTHER_PERM'], "template",['REQUIRED_PERMS']);
  }

  async run(client, message, args) {
    try{}catch(err){console.log(`[ERROR] - at command`, err.stack)}
  }
}
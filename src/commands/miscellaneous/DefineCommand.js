const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class DefineCommand extends BaseCommand {
  constructor() {
    super('define', 'miscellaneous', ['definition'],'Defines a meaning of an english word.', [], "define hello_word", ['SEND_MESSAGES']);
  }

  async run(client, message, args) {
    try{
      
    }catch(err){console.log(`[ERROR] - at DEFINE`, err.stack)}
  }
}
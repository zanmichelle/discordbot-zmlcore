const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');

module.exports = class CreateroleCommand extends BaseCommand {
  constructor() {
    super('createrole', 'moderation', ['cr'],'Create a role in server.', ['MANAGE_ROLES','ADMINISTRATOR'], "createrole <name> <color> <heist> <display_seperatly: true/false> [permissions separated by ,]", ['MANAGE_ROLES']);
  }

  async run(client, message, args) {
    try{

    }catch(err){console.log(`[ERROR] - at CREATEROLE`, err.stack)}
  }
}
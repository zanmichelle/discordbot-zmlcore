const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class BalanceCommand extends BaseCommand {
  constructor() {
    super('balance', 'economy', ['bal'],'Shows users balance.', [], "balance", ['SEND_MESSAGES'], 1);
  }

  async run(client, message, args) {
    try{
      // check if guild is in the db.
      let data = await client.database.prepare(`SELECT * FROM economy WHERE guild_id=? AND member=?`).get(message.guild.id, message.author.id);
      if(!data) await client.database.prepare(`INSERT INTO economy(guild_id,member) VALUES(?,?)`).run(message.guild.id, message.author.id);
      let person = await client.database.prepare(`SELECT * FROM economy WHERE guild_id=? AND member=?`).get(message.guild.id, message.author.id);

      // make embed 
      let embed = new MessageEmbed().setTitle(`Balance:`)
      .setDescription(`**💵Money:** $${person.money}\n**🏦Bank:** $${person.bank}`)
      .setThumbnail(message.author.avatarURL())
      return message.channel.send(embed)
      
    }catch(err){console.log(`[ERROR] - at command`, err.stack)}
  }
}
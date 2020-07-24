const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class BalanceCommand extends BaseCommand {
  constructor() {
    super('balance', 'economy', ['bal'],'Shows users balance.', [], "balance", ['SEND_MESSAGES']);
  }

  async run(client, message, args) {
    try{
      // check if guild is in the db.
      let data = await client.economy.prepare(`SELECT * FROM guild${message.guild.id} WHERE member=?`).get(message.author.id);
      if(!data){
        let items = {}
        await client.economy.prepare(`INSERT INTO guild${message.guild.id} VALUES(?,?,?,?)`).run(message.author.id, 1000, 0, JSON.stringify(items));
      }
      let person = await client.economy.prepare(`SELECT * FROM guild${message.guild.id} WHERE member=?`).get(message.author.id)
      // console.log(person.money,person.bank,JSON.parse(person.items))
      let embed = new MessageEmbed().setTitle(`Balance:`)
      .setDescription(`**💵Money:** $${person.money}\n**🏦Bank:** $${person.bank}`)
      .setThumbnail(message.author.avatarURL())
      return message.channel.send(embed)
      
    }catch(err){console.log(`[ERROR] - at command`, err.stack)}
  }
}
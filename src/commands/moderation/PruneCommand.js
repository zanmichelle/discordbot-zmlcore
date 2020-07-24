const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class PruneCommand extends BaseCommand {
  constructor() {
    super('prune', 'moderation', ['clear','purge','delete'],'Command can clear messages in a channel.', ['MANAGE_MESSAGES'], "prune <amount> [user to filter only message sent by member]",['MANAGE_MESSAGES']);
  }

  async run(client, message, args) {
    try{
      let amount = args[0] && !isNaN(args[0]) ? parseInt(args[0]) : 1;
      if(amount > 1000) return message.channel.send(`Prune limit is \`1000\`.`)
      message.delete()
      let messagesToDelete = await getMessages(message.channel, amount);
      await message.channel.send({embed: new Discord.MessageEmbed().setDescription(`☑️ **Deleted ${messagesToDelete.length} ${messagesToDelete.length != 1 ? 'messages.' : "message."}**`)})
      
    }catch(err){console.log(`[ERROR] - at PRUNE`, err.stack)}
    async function getMessages(channel, limit) {
      try{
        const all_messages = [];
        let last_id;
        let dec = limit
        while (true) {
            const options = { limit: dec > 100 ? 99 : dec };
            dec = dec-options.limit
            if (last_id) {
                options.before = last_id;
            }
    
            const messages = await channel.messages.fetch(options);
            await message.channel.bulkDelete(messages)
            all_messages.push(...messages.array());
            last_id = messages.last().id;
    
            if (dec == 0) {
                break;
            }
        }
        return all_messages;
      }catch(err){console.log(`[ERROR] - at PRUNE function getMessages()\n`,err.stack)}
      
  }
  }
}
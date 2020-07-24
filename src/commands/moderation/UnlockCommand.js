const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', [],'Unlocks a channel from being locked.', ['MANAGE_CHANNELS'], "unlock <channel>",['MANAGE_CHANNELS']);
  }

  async run(client, message, args) {
    try{
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
      let role = message.guild.roles.cache.find(r => r.name === "@everyone")
      channel.updateOverwrite(role.id, {
        SEND_MESSAGES: null
      }).then(async()=>{
        await channel.setName(channel.name.replace("🔒",""))
        let embed = new Discord.MessageEmbed().setDescription(`🔒 ${channel} is now **unlocked**.`)
        await message.channel.send(embed)
      })
    }catch(err){console.log(`[ERROR] - at UNLOCK`, err.stack)}
  }
}
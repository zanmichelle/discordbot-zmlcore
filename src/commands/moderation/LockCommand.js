const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', [],'Useful for lockdowns or anti spams.', ['ADMINISTATOR'], "lock [channel]",['ADMINISTRATOR']);
  }

  async run(client, message, args) {
    try{
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
      let role = message.guild.roles.cache.find(r => r.name === "@everyone")
      channel.updateOverwrite(role.id, {
        SEND_MESSAGES: false
      }).then(async()=>{
        await channel.setName(`🔒${channel.name}`)
        let embed = new Discord.MessageEmbed().setDescription(`🔒 ${channel} is now **locked**.`)
        await message.channel.send(embed)
      })
    }catch(err){console.log(`[ERROR] - at LOCK`, err.stack)}
  }
}
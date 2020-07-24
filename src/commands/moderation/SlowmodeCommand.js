const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', ['ratelimit'],'Set a custom slowmode in a channel.', ['MANAGE_CHANNELS','MANAGE_MESSAGES'], "slowmode <seconds>",['MANAGE_CHANNELS']);
  }

  async run(client, message, args) {
    try{

      if (isNaN(args[0])) return message.channel.send(`Specified parameter wasn't a number.`)
      let time = parseInt(args[0])
      if (time > 21600) return message.channel.send(`Ratelimit may not exceed 21600 seconds!`)
      if (0 < time) {
        message.channel.setRateLimitPerUser(time).then(() => {
          message.channel.send(`⏲ Is now set to \`${time}\`.`)
        }).catch((e)=>{console.log(`[ERROR] at SLOWMODE .catch() function.\n`,e.stack);return message.channel.send(`I couldn't change slowmode.`)})
      } else if(time <= 0){
        message.channel.setRateLimitPerUser(0).then(() => {
          message.channel.send(`⏲ Removed *\`ratelimit\`* from this channel.`)
        }).catch(()=>{return message.channel.send(`I couldn't change slowmode.`)})
      }
    }catch(err){console.log(`[ERROR] - at SLOWMODE`, err.stack)}
  }
}
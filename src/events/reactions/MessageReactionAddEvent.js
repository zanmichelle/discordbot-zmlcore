// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    if(user.bot) return;
    try {
      if(reaction._emoji.name !== '🎉') return
      if(!client.giveaways.get(reaction.message.id)) return
      let message = await client.giveaways.get(reaction.message.id);
      if(message.req == false) return approved(user);

      let check = await client.guilds.cache.get(message.in_guild);

      if(check.members.cache.get(user.id)) return approved(user);
      else{
        reaction.users.remove(user);
        return denied(user);
      }
    } catch (error) {
      console.log(`[ERROR] - at event MessageReactionAdd\n`,error.stack)
    }
    
    


    async function approved(user) {
      // console.log(`Entry approved!`)
      let embed = new MessageEmbed()
      .setTitle(`✅ Entry approved!`).setColor('#009900')
      .setDescription(`Your entry for [giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) in ${reaction.message.guild.name} was approved!
**Good luck!**`);
      try {
        user.send(`Join our support server https://discord.gg/w2hGS26\n\n*Here is place for your ad*`,{embed});
      } catch (error) {
        console.log(`Couldn't dm user approval message!`)
      }

    }

    async function denied(user) {
      // console.log(`Entry denied!`)
      let embed = new MessageEmbed()
      .setTitle(`⛔️ Entry denied!`).setColor('#df3300')
      .setDescription(`Your entry for [giveaway](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) in ${reaction.message.guild.name} was denied!
**You must be in required guild!**`);
      try {
        user.send(`Join our support server https://discord.gg/w2hGS26\n\n*Here is place for your ad*`,{embed});
      } catch (error) {
        console.log(`Couldn't dm user denial message!`)
      }
    }
  }
}
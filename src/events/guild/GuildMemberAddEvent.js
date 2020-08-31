// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')


module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    try{
      if(!client.settings.get(member.guild.id)) return
      let settings = await client.settings.get(member.guild.id);
      if(!settings.welcome) return
      // console.log(settings.welcome,settings.join_role,settings.join_msg)
      if(settings.welcome == 'null' && settings.join_role == 'null') return
    
      let joined = await member.guild.members.cache.size;

      if(settings.join_msg=='null') settings.join_msg = '**WELCOME [user] to the [guild]!**\nYou are #[number] member!';

      settings.join_msg = settings.join_msg.replace(/\[user]/,member.user.username).replace(/\[guild]/,member.guild.name).replace(/\[number]/,joined)
      let embed = new MessageEmbed().setDescription(settings.join_msg).setTimestamp(m(new Date()).format('mm/dd/yyyy hh:mm:ss a'))
      if(member.guild.channels.cache.get(settings.welcome)) member.guild.channels.cache.get(settings.welcome).send(embed)

    }catch(err){
      console.log(`[ERROR] - at GuildMemberAdd event\n`, err.stack)
    }
  }
}
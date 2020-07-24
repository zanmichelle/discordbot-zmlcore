// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const {db} = require('../utils/structures/BaseDB');
const {MessageEmbed, MessageAttachment} = require('discord.js');
const m = require('moment')


module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    try{
      let {welcome,join_role,join_msg} = await db.prepare(`SELECT * FROM guilds WHERE guild_id = ?`).get(member.guild.id);
      if(!welcome) return
      console.log(welcome,join_role,join_msg)
      if(welcome == 'null' && join_role == 'null') return
      if(member.guild.channels.cache.get(welcome)) welcome = member.guild.channels.cache.get(welcome);
      if(member.guild.roles.cache.get(join_role)) join_role = member.guild.roles.cache.get(join_role)
      let joined = await member.guild.members.cache.filter(m => !m.user.bot).size;

      if(join_msg=='null') join_msg = '**WELCOME [user] to the [guild]!**\nYou are #[number] member!';

      join_msg = join_msg.replace(/\[user]/,member.user.username).replace(/\[guild]/,member.guild.name).replace(/\[number]/,joined)
      let embed = new MessageEmbed().setDescription(join_msg).setTimestamp(m(new Date()).format('mm/dd/yyyy hh:mm:ss a'))
      welcome.send(embed)
    }catch(err){
      console.log(`[ERROR] - at GuildMemberAdd event\n`, err.stack)
    }
  }
}
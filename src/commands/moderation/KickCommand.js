const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', [],'Kicks a member out of the server.', ['KICK_MEMBERS'], "kick <member> [reason]",['KICK_MEMBERS']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Missing arguments.`).then(m=>m.delete({timeout: 5000}));
      let person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0].replace(/[@#<>!&]+/g))
      if(!person) return message.channel.send(`You need to specify a member.`).then(m=>m.delete({timeout: 5000}));
      if(message.member.roles.highest.rawPosition <= message.guild.member(person).roles.highest.rawPosition && message.author.id !== message.guild.owner.id) return message.reply(`You can not kick member with higher or even role as yourself`).then(m=>m.delete({timeout:5000}))
      let {log} = await db.prepare(`SELECT log FROM guilds WHERE guild_id = ?`).get(message.guild.id);
      let reason = args[1] ? args.slice(1).join(" ") : 'No reason.'
      let logembed = new MessageEmbed().setTitle(`🦵 Kicked!`).setTimestamp(new Date())
      .setDescription(`**Member:** <@${person.id}> (${reason})\n**Moderator:** <@${message.author.id}>\n**Kicked at:** ${new Date().toString()}`)
      .setThumbnail(client.users.cache.get(person.id).avatarURL());
      let embed = new MessageEmbed().setDescription(`**☑️ <@${person.id}> was succesfully kicked!**`);

      person.kick(reason).then(async()=>{
        message.channel.send(embed);
        if(log){
          if(message.guild.channels.cache.get(log)) return message.guild.channels.cache.get(log).send(logembed);
        }
      }).catch(e=> message.channel.send(`✖️ Couldn't kick this member!`));

    }catch(err){console.log(`[ERROR] - at KICK`, err.stack)}
  }
}
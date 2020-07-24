const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms')

module.exports = class SoftbanCommand extends BaseCommand {
  constructor() {
    super('softban', 'moderation', ['sban'],'Soft bans an user, bans him and then unbans to delete messages.', ['BAN_MEMBERS'], "softban <member> [reason]",['BAN_MEMEBRS']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Missing arguments.`).then(m=>m.delete({timeout: 5000}));
      let person = message.mentions.members.first() || message.guild.member(client.users.cache.get(args[0])) || client.users.cache.get(args[0].replace(/[@#<>!&]+/g))
      if(!person) return message.channel.send(`You need to specify a member.`).then(m=>m.delete({timeout: 5000}));
      if(message.member.roles.highest.rawPosition <= message.guild.member(person).roles.highest.rawPosition && message.author.id !== message.guild.owner.id) return message.reply(`You can not kick member with higher or even role as yourself`).then(m=>m.delete({timeout:5000}))
      let {log} = await db.prepare(`SELECT log FROM guilds WHERE guild_id = ?`).get(message.guild.id);

      let reason = args[1] ? args.join(" ") : 'No reason.'
      let logembed = new MessageEmbed().setTitle(`Soft ban`).setTimestamp(new Date())
      .setDescription(`**Member:** <@${person.id}> (${reason})\n**Moderator:** <@${message.author.id}>\n**Banned at:** ${new Date().toLocaleDateString()}`)
      .setThumbnail(client.users.cache.get(person.id).avatarURL());
      let embed = new MessageEmbed().setDescription(`**☑️ <@${person.id}> was succesfully soft banned!**`);

      message.guild.members.ban(person.id, {
        days: 7,
        reason: `Soft banned - cleared messages: ${reason}`
      }).then(user=>{
        message.guild.members.unban(user.id).then(async() => {
          message.channel.send(embed);
          if(log){
            if(message.guild.channels.cache.get(log)) message.guild.channels.cache.get(log).send(logembed)
          }
        });
      }).catch(()=>{return message.channel.send(`Coulnd't softban this member.`)})
    }catch(err){console.log(`[ERROR] - at SOFTBAN`, err.stack)}
  }
}
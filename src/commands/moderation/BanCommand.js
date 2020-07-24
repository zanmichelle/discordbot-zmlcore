const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', [],'Bans a user', ['BAN_MEMBERS'], "ban <member> [reason]",['BAN_MEMBERS']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Missing arguments.`).then(m=>m.delete({timeout: 5000}));
      let person = message.mentions.members.first() || message.guild.member(client.users.cache.get(args[0])) || client.users.cache.get(args[0].replace(/[@#<>!&]+/g))
      if(!person) return message.channel.send(`You need to specify a member.`).then(m=>m.delete({timeout: 5000}));
      if(message.member.roles.highest.rawPosition <= message.guild.member(person).roles.highest.rawPosition && message.author.id !== message.guild.owner.id) return message.reply(`You can not ban member with higher or even role as yourself`).then(m=>m.delete({timeout:5000}))
      let {log} = await db.prepare(`SELECT log FROM guilds WHERE guild_id = ?`).get(message.guild.id);

      let logembed = new MessageEmbed().setTitle(`🔨 Ban HAMMER has spoken!`).setTimestamp(new Date())
      .setDescription(`**Member:** <@${person.id}> (${args[1]? args.slice(1).join(" ") : 'No reason.'})\n**Moderator:** <@${message.author.id}>\n**Banned at:** ${ms(new Date().toString())}`)
      .setThumbnail(client.users.cache.get(person.id).avatarURL());
      let embed = new MessageEmbed().setDescription(`**☑️ <@${person.id}> was succesfully banned!**`);

      message.guild.members.ban(person.id).then(async()=>{
        message.channel.send(embed);
        if(log){
          if(message.guild.channels.cache.get(stmt)) return message.guild.channels.cache.get(log).send(logembed);
        }
      }).catch(e=> message.channel.send(`✖️ Couldn't ban this member!`));

    }catch(err){console.log(`[ERROR] - at BAN`, err.stack)}
  }
}
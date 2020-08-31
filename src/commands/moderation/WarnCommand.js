const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', [],'Gives member a warn.', ['ADMINISTRATOR','MANAGE_GUILD'], "warn <member> [reason]",['MANAGE_GUILD', 'MANAGE_MESSAGES']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Invalid arguments, mention a user.`);
      let member = message.mentions.members.first() || message.guild.member(client.users.cache.get(args[0])) || client.users.cache.get(args[0].replace(/[@#<>!&]+/g));
      if(!member) return message.channel.send(`Invalid mention/ID.`);

      let reason = args[1] ? args.slice(1).join(" ") : 'No reason.';

      db.prepare(`INSERT INTO warnings(guild_id,member,moderator,reason) VALUES(?,?,?,?)`).run(message.guild.id,member.id,message.author.id,reason);
      let data = await db.prepare('SELECT * FROM guilds WHERE guild_id=?').get(message.guild.id);
      let embed = new Discord.MessageEmbed()
      .setTitle(`User warned!`)
      .setDescription(`**User:** <@${member.id}>\n**Reason:** ${reason}\n**Moderator:** <@${message.author.id}>`);
      message.channel.send({embed: new Discord.MessageEmbed().setFooter(`❗️${member.user.tag} has been warnerd!`).setColor(`#ff3333`)})
      if(data.log!=='null' && message.guild.channels.cache.get(data.log)) message.guild.channels.cache.get(data.log).send(embed);

      // emit warn event:
      client.emit('userWarn', message.guild, member.id, reason, args);
    }catch(err){console.log(`[ERROR] - at WARN`, err.stack)}
  }
}
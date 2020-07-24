const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', [],'Unbans a banned member.', ['BAN_MEMBERS'], "unban <id>",['BAN_MEMBERS']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Missing arguments.`).then(m=>m.delete({timeout: 5000}));
      let member = args[0]
      let {log} = await db.prepare(`SELECT log FROM guilds WHERE guild_id = ?`).get(message.guild.id);

      let logembed = new Discord.MessageEmbed().setTitle(`Unbanned!`).setTimestamp(new Date())
      .setDescription(`**<@${member}>** was successfully unbanned by: <@${message.author.id}>\n**Date:** ${new Date().toString()}`)
      .setThumbnail(client.users.cache.get(message.author.id).avatarURL());
      let embed = new Discord.MessageEmbed().setDescription(`**☑️ <@${member}> was succesfully unbanned!**`);

      message.guild.members.unban(member).then(async() => {
        message.channel.send(embed);
        if(log){
          if(message.guild.channels.cache.get(log)) message.guild.channels.cache.get(log).send(logembed)
        }
      }).catch(()=>{return message.channel.send(`Member isn't banned or there was a problem unbanning him.`)});
    }catch(err){console.log(`[ERROR] - at UNBAN`, err.stack)}
  }
}
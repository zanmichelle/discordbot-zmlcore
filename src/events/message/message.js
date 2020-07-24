const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    try{
      if (message.author.bot) return;
      let {prefix} = await db.prepare(`SELECT prefix FROM guilds WHERE guild_id = ?`).get(message.guild.id);
      prefix = prefix == 'null' ? client.prefix : prefix
      if (message.content.startsWith(prefix)) {
        const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
        const command = client.commands.get(cmdName);
        const perms = await message.channel.permissionsFor(client.user);
        if(!message.member.hasPermission(command.memberPerms)) return message.channel.send({embed: new MessageEmbed().setDescription(`You are required to have \`${client.memberPerms.join(", ")}\`.`) })
        if (!perms.has('SEND_MESSAGES')) return
        if (command) {
          if(command.clientPerms.length){
            const missingPerms = perms.missing(command.clientPerms)
            if(missingPerms.length) return message.channel.send(`I'm missing \`${missingPerms}\` permissions.`)
          }
          command.run(client, message, cmdArgs);
        }
      }
    }catch(err){console.log(`[CRITICAL ERROR] - at MESSAGE event.\n`,err.stack)} 
  }
}
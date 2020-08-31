const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');
const BaseCooldown = require('../../utils/structures/BaseCooldown');
const pretty = require('pretty-ms');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    try{
      if (message.author.bot) return;
      if(message.channel.type == 'dm') return
      let prefix = await client.settings.get(message.guild.id).prefix || '-';
      if (message.content.startsWith(prefix)) {
        const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .trim()
        .split(/\s+/);
        const command = client.commands.get(cmdName);
        const perms = await message.channel.permissionsFor(client.user);
        
        if (!perms.has('SEND_MESSAGES')) return
        
        // Run the command.
        if (command) {
          try {
            if (!perms.has("EMBED_LINKS")) return message.channel.send(`\`EMBED_LINKS\` is one of my essential permissions, I need that to function properly.\nGrant that permission to me in Server Settings > Roles > ${client.user} > \`EMBED_LINKS\` ON.`).then(m=>m.delete({timeout: 2500}))
            if((command.memberPerms && command.memberPerms.length) && !message.member.hasPermission(command.memberPerms)) return message.channel.send({embed: new MessageEmbed().setDescription(`You are required to have \`${command.memberPerms.join(", ")}\`.`) })
            const check = await client.disabledCommands.get(`${message.guild.id}_${command.name}`);
            if(check) return message.channel.send({embed:new MessageEmbed().setDescription(`**${command.name}** is currently disabled in \`${message.guild.name}\`.`)})
            if(client.cooldowns.get(`${message.guild.id}_${message.author.id}-${command.name}`)) {return message.channel.send(`You are still on a cooldown!\n**Time left:** \`${pretty(await client.cooldowns.get(`${message.guild.id}_${message.author.id}-${command.name}`).getTimeLeft())}\``);}

            if(command.clientPerms.length){
              const missingPerms = perms.missing(command.clientPerms)
              if(missingPerms.length) return message.channel.send(`I'm missing \`${missingPerms}\` permissions.`)
            }
            command.run(client, message, cmdArgs);
          } catch (error) {
            console.log(`[ERROR] - Message Event, while executing command: ${command.name}\n`,error.stack);
          }
        }
      }
    }catch(err){console.error(`[CRITICAL ERROR] - at MESSAGE event.\n`,err.stack)} 
  }
}
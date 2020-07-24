const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('role', 'moderation', ['r'],'Add or remove roles from member.', ['MANAGE_ROLES'], "role add/remove <user> [roles separated by ,] ",['MANAGE_ROLES']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Missing arguments.`).then(m=>m.delete({timeout: 5000}));
      let person = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.get(args[1].replace(/[@#<>!&]+/g))
      if(!person) return message.channel.send(`Invalid member or id.`)
      if(message.member.roles.highest.rawPosition <= message.guild.members.cache.get(person.id).roles.highest.rawPosition && message.author.id !== message.guild.owner.id) return message.reply(`You can not ban member with higher or even role as yourself`).then(m=>m.delete({timeout:5000}))
      if (message.member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send("User has higher role than me.")
      let role = message.guild.roles.cache.get(args[2].replace(/[@!#&<>]+/g,"")) || message.guild.roles.cache.find(r => r.name === args.slice(2).join(" "))
      switch(args[0]){
        
        case 'add':
          if (!person) return message.channel.send(`Missing member parameter.`)
          if (!role) return message.channel.send(`Missing role parameter.`)
          message.guild.member(person).roles.add(role.id).then(() => {
            message.channel.send(`☑️ Role successfully added.`)
          }).catch(() => {
            message.channel.send(`Couldn't update roles.`)
          })
        break;
        case 'remove':
          if (!person) return message.channel.send(`Missing member parameter.`)
          if (!role) return message.channel.send(`Missing role parameter.`)
          message.guild.member(person).roles.remove(role.id).then(() => {
            message.channel.send(`☑️ Role successfully removed.`)
          }).catch(() => {
            message.channel.send(`Couldn't update roles.`)
          })
        break;
      }
    }catch(err){console.log(`[ERROR] - at ROLE`, err.stack)}
  }
}
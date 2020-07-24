const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', ['nick'],'Change members display name / nickname.', ['MANAGE_NICKNAMES','MANAGE_MESSAGES'], "nickname <user> <new nickname>",['MANAGE_NICKNAMES']);
  }

  async run(client, message, args) {
    try{
      const member = args[0] ? message.mentions.users.first() || client.users.cache.get(args[0]) : message.member(client.users.cache.get(message.author.id));
      const nickname = args.slice(1).join(" ")
      if (!nickname) return message.channel.send(`Please specifiy a nickname.`).then(m=>m.delete({timeout:5000}))
      if (message.member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send("User has higher role than me.")
      message.guild.member(member).setNickname(nickname).then(() => {
        message.channel.send()
      }).catch(err => {
        message.channel.send(`I can not set a nickname for this member!`)
      })
    }catch(err){console.log(`[ERROR] - at NICKNAME`, err.stack)}
  }
}
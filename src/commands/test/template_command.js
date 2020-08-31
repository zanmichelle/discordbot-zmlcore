const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const pretty = require('pretty-ms')

module.exports = class TemplateCommand extends BaseCommand {
  constructor() {
    super('template', 'category', ['aliases'],'This is command description.', ['ADMINISTRATOR'], "template", ['REQUIRED_PERMS'], 0);
  }

  async run(client, message, args) {
    return;
    const filter = m => m.author.id === message.author.id
    const data = (msg)=>{
      return new Promise(async(resolve,reject)=>{
          await message.channel.send(msg)
          const data = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
          resolve(data.first().content)
        });
      }
    try{
      // if(this.cooldown !== 0 && this.cooldown) client.cooldowns.set(`${message.guild.id}_${message.author.id}-${this.name}`, new timer(function() {client.cooldowns.delete(`${message.guild.id}_${message.author.id}-${this.name}`)}, this.cooldown*1000));
      // console.log(this.cooldown)
      // console.log(client.cooldowns.get(`${message.guild.id}_${message.author.id}-${this.name}`).getTimeLeft())

      
      const time = await data(`Specify the duration:`)
      console.log(time)
    }catch(err){console.log(`[ERROR] - at TEMPLATE\n`, err.stack)}
  }
}
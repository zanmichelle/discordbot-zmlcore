// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');
module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }
  
  async run(client, message) {
    let settings = client.settings.get(message.guild.id);
    if(settings.automod == 'false') return;
    if(message.mentions.users.size == 0) return
    
    let embed = new MessageEmbed()
    .setTitle(`Ghost tag 👻`)
    .setDescription(`${message.mentions.users.first()} was tagged by: <@${message.author.id}>`)
    .setFooter(`Ghost tag - by deleting the message.`);

    message.channel.send(embed)
  }
}
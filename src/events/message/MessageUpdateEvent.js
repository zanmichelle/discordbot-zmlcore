// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
const { MessageEmbed } = require('discord.js');
module.exports = class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }
  
  async run(client, oldMessage, newMessage) {
    let settings = client.settings.get(oldMessage.guild.id);
    if(settings.automod == 'false') return;
    if(newMessage.mentions.users.size == oldMessage.mentions.users.size) return
    if(newMessage.mentions.users.size > oldMessage.mentions.users.size) return
    let embed = new MessageEmbed().setDescription(`${oldMessage.mentions.users.first()} was tagged by: <@${oldMessage.author.id}>`).setFooter(`Ghost tag - by editing message.`);

    newMessage.channel.send(embed);
  }
}
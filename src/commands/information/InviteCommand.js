const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed, Message} = require('discord.js');
const ms = require('ms');

module.exports = class InviteCommand extends BaseCommand {
    constructor() {
        super('invite', 'information', ['inv'],'Sends a message to invite the bot.', [], "invite", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            let embed = new MessageEmbed()
            .setDescription(`[Invite](https://discord.com/oauth2/authorize?client_id=733496490890231868&scope=bot&permissions=491252991) me!`)
            message.channel.send(embed);
        }catch(err){console.log('[ERROR] - at INVITE\n', err.stack)}
    }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class SlapCommand extends BaseCommand {
    constructor() {
        super('slap', 'fun', [],'Slap a user!', [], "slap <user>", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(!args[0]) return message.channel.send(`Do you want me to slap you? Because you didn't mention who am I slapping..`)
            let person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0].repalce(/\[@#<>&!]+/g,""));
            if(!person) return message.channel.send(`Thats not a person.`);
            
        }catch(err){console.log('[ERROR] - at SLAP', err.stack)}
    }
}
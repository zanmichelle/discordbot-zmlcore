const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const moment = require('moment')

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class UserinfoCommand extends BaseCommand {
    constructor() {
        super('userinfo', 'information', ['whois'],'This is command description.', [], "userinfo", []);
    }

    async run(client, message, args) {
        try{
            let member = args[0] ? message.mentions.members.first() || message.guild.members.cache.get(args[0].replace(/\[@<>!&#]+/g)) :  message.member 
            if(!member) return message.channel.send(`Invalid member.`);
            // console.log(user,user.flags.toArray(),message.mentions.members.first())
            let roles = []
            member._roles.forEach(role=>{roles.push(`<@&${role}>`)})
            const embed = new MessageEmbed()
            .setTitle(`User information for: ${member.user.tag}`)
            .setDescription(`__**General information:**__\n
**• Username:** ${member.user.username}
**• Tag:** ${member.user.discriminator}
**• ID:** ${member.user.id}
**• Joined guild at:** ${moment(member.joinedTimestamp).format('MM/DD/YYYY hh:mm a')}
**• Account creation date:** ${moment((member.user.id  / 4194304) + 1420070400000).format('MM/DD/YYYY hh:mm a')}
**• ${member.lastMessageChannelID === null ? 'User didn\'t sent any messages yet.' : `[Last message](https://discordapp.com/channels/${message.guild.id}/${member.lastMessageChannelID}/${member.lastMessageID})`}**

__**Other information:**__`)
            .addField(`• Flags:`, member.user.flags.length ? member.user.flags.map(flag => flags[flag]).join(', ') : 'None',true)
            .addField(`• Roles in ${message.guild.name}:`,roles.length > 0 ? roles.join(`, `): 'None.',true)
            .addField(`• Bot:`, member.user.bot ? `☑️` : `⛔️`,true)
            .setThumbnail(member.user.displayAvatarURL());
            message.channel.send(embed)
        }catch(err){console.log('[ERROR] - at USERINFO\n', err.stack)}
    }
}
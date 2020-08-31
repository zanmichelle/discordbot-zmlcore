const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const pretty = require('pretty-ms');
const moment = require('moment');

module.exports = class BotinfoCommand extends BaseCommand {
    constructor() {
        super('botinfo', 'information', [],'Displays bots info.', [], "botinfo", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            // message.channel.send(`Im in ${client.guilds.cache.size} guilds!`);
                const serverList = client.guilds.cache.size
                const channelList = client.channels.cache.size
                const userList = client.users.cache.size
                const reducer = (accumulator, currentValue) => accumulator + currentValue;

                let embed = new MessageEmbed()
                  .setTitle(`Info`)
                  .setThumbnail(client.user.displayAvatarURL())
                  .addFields({
                      name: `Uptime`,
                      value: `${pretty(client.uptime, {verbose:true})}`,
                      inline: true
                    },{
                    name: `Ping`,
                    value: `\`${Math.round(client.ws.ping)}ms\``,
                    inline: true
                  }, {
                    name: `Memory Used`,
                    value: `🧬 \`${(((Object.values(process.memoryUsage()).reduce(reducer))/ 1024 / 1024).toFixed(2))} MB\``,
                    inline: true
                  }, {
                    name: `Servers`,
                    value: serverList.toLocaleString(),
                    inline: true
                  }, {
                    name: `Channels`,
                    value: channelList.toLocaleString(),
                    inline: true
                  }, {
                    name: `Users`,
                    value: userList.toLocaleString(),
                    inline: true
                  });
                return message.channel.send(embed);
        }catch(err){console.log('[ERROR] - at BOTINFO', err.stack)}
    }
}
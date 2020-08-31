const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed, Guild} = require('discord.js');
const ms = require('ms');
const BaseGiveaway = require('../../utils/structures/BaseGiveaway');
const pretty = require('pretty-ms');
const moment = require('moment');

let filter;

module.exports = class GcreateCommand extends BaseCommand {
    constructor() {
        super('gcreate', 'giveaways', [],'Create a giveaway!', ['MANAGE_GUILD','MANAGE_CHANNELS'], "gcreate", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        //remove return
        // return
        try{
            let guild_config = client.settings.get(message.guild.id);
            filter = m => m.author.id === message.author.id
            let count = await client.database.prepare('SELECT * FROM giveaways WHERE guild_id=? AND ended=\'false\'').all(message.guild.id);
            if(count.length && count.length > 5 && guild_config.premium == 'false') return message.channel.send(`You can't host more than 5 giveaways at once without premium.\n\nGet premium for unlimited giveaways and mroe featuers!`)
            
            const channel = await data(`Please mention a channel that you would like to create a giveaway in:`,message,true)

            if(!channel.id) return message.channel.send(`Invalid channel, restart the process.`)

            const t = await data(`Specify the duration: *Example: 1h = one hour, 1d = one day. You can't provide 3d1h, only one type.*`,message)
            const time = ms(t)//.catch()
            if(isNaN(time) || !time) return message.channel.send(`Invalid time duration. Restart the process.`)
            const start = Date.now();
            const end = Date.now() + time;

            const reward = await data(`Specify the reward for the giveaway:`,message);
            const winners = await data(`Enter the amount of winners:`,message);
            if(isNaN(winners) || winners == '0') return message.channel.send(`Invalid number for amount of winners. Restart the process.`)
            const in_guild = await data(`Does members need to join a specific guild?\nIf so paste a permanent invite link here *(exp. https://discord.gg/123456)*\n\n OR type \`no\`.`,message)

            if(!in_guild.match(/^(https?:\/\/(?:www\.)?discord\.gg\/[a-zA-Z0-9]{7})$/g) && in_guild.toLowerCase() !== 'no') return message.channel.send(`You must provide a link or 'no' for an answer. Restart the process`)
            // else console.log(time,start,end, in_guild, reward, winners)

            let inv = await in_guild.toLowerCase() == 'no' ? 'null' : await client.fetchInvite(in_guild);


            if(inv instanceof Object && !client.guilds.cache.get(inv.guild.id)) return message.channel.send(`Im not in this guild, invite me to the guild in order to set-up guild requirement for giveaway!`);
            if(inv instanceof Object && guild_config.premium=='false') {
                let total = db.prepare('SELECT * FROM giveaways WHERE guild_id=? AND in_guild <> \'null\' AND ended=\'false\'').all(message.guild.id);
                if(total >= 3) return message.channel.send(`You may host only 3 giveaways with in guilds requirement at once without premium.`);
            }
            
            let giveaway_embed = new MessageEmbed()
            .setTitle(`🎁 ${reward}`)
            .setDescription(`🏆 **${winners}** ${winners == 1 ? 'winner' : 'winners'}
⏳ Time left: **${pretty(end - Date.now())}**
${in_guild == 'no' ? '' : `\n❗️ Must be member of **[${inv.guild.name}](${in_guild})** to enter!`}`)
            .setFooter(`Ends at`)
            .setTimestamp(end);

            let msg = await channel.send(giveaway_embed);
            await msg.react('🎉');
            try {
                let cache = {
                    in_guild: in_guild == 'no' ? 'null' : inv.guild.id,
                    req: in_guild == 'no' ? false : true
                }
                client.giveaways.set(msg.id,cache);
            } catch (error) {
                console.log(`ERROR adding ${msg.id} to the client.giveaways cache.`);
            }

            return db.prepare('INSERT INTO giveaways(guild_id,channel,message,creator,reward,amount,in_guild,invite,start_at,end_at) VALUES(?,?,?,?,?,?,?,?,?,?)').run(message.guild.id, channel.id, msg.id, message.author.id, reward, parseInt(winners), inv instanceof Object ? inv.guild.id : 'null', in_guild.match(/^(https?:\/\/(?:www\.)?discord\.gg\/[a-zA-Z0-9]{7})$/g) ? in_guild : 'null', start, end);

        }catch(err){console.log('[ERROR] - at GCREATE\n', err.stack)}
    }
}
const data = (msg,message,getChannel=false)=>{
    return new Promise(async(resolve,reject)=>{
        await message.channel.send(msg)
        const data = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
        if(getChannel) {
            if(data) {
                if(data.first().mentions.channels.first()) resolve(data.first().mentions.channels.first());
                else message.channel.send('Invalid channel. Restart the process')
            }
        }
        if(data) resolve(data.first().content)
        else data(msg+"\nThere was an error with this step.",message,getChannel);
    });
}
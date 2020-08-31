const ZMLclient = require('./utils/ZMLcore');
const client = new ZMLclient({partials:['MESSAGE', 'CHANNEL', 'REACTION']});
const {db} = require('./utils/structures/BaseDB');
const cron = require('node-cron');
const { MessageEmbed } = require('discord.js');
const pretty = require('pretty-ms');
const ms = require('ms');
const moment = require('moment');
const { map } = require('mathjs');

process.on('beforeExit',()=>{db.close();});
process.on('exit',()=>{db.close();});


cron.schedule(' 30 */2 * * * *', async()=>{
    console.log(`Cron scheduler`);

    let giveaways = db.prepare('SELECT * FROM giveaways WHERE ended=\'false\'').all();
    giveaways.forEach(async giveaway => {
        try {
            if(!client.channels.cache.get(giveaway.channel)) return 
            let ended = giveaway.end_at <= Date.now() ? true : false
            if(ended) return client.emit('giveawayEnd', giveaway);
            let message = await client.channels.cache.get(giveaway.channel).messages.fetch(giveaway.message);
            if(!message) return
            // console.log(message)

            let inv = giveaway.in_guild == 'null' || giveaway.in_guild == null ? 'null' : client.guilds.cache.get(giveaway.in_guild);
            let giveaway_embed = new MessageEmbed()
            .setTitle(`🎁 ${giveaway.reward}`)
            .setDescription(`🏆 **${giveaway.amount}** ${giveaway.amount == 1 ? 'winner' : 'winners'}
⏳ Time left: **${pretty(giveaway.end_at - Date.now())}**
${giveaway.in_guild == 'null' ? '' : `\n❗️ Must be member of **[${inv.name}](${giveaway.invite})** to enter!`}`)
            .setFooter(`Ends at: ${moment(giveaway.end_at).format('MM/DD/YYYY hh:mm a')}`);


            message.edit(giveaway_embed);
        } catch (error) {
            console.log(`[ERROR] - at schedule giveaways\n`,error.stack)
        }
    });
});

async function endGiveaway(giveaway) {
    try {
        let message = await client.channels.cache.get(giveaway.channel).messages.fetch(giveaway.message);

        let all = await message.reactions.cache.get('🎉').users.fetch();
        let users = all.filter(u => !u.bot);
        // let random = Math.floor(Math.random() * users.length)

        let user = users.randomUser();
        let cache = []
        user.forEach(u=>{
            cache.push(`<@${u}>`)
        });

        let win_message = giveaway.amount = 1 ? `Winner of the **${giveaway.amount} ${giveaway.reward}** is ${cache.join("")}` : `Winners of the **${giveaway.amount} ${giveaway.reward}** are ${cache.join(', ')}!`
        message.channel.send(win_message);

        let winner_embed = new MessageEmbed()
        .setTitle(`🎁 ${giveaway.reward}`)
        .setDescription(`${giveaway.amount == 1 ? `🎉 Winner: <@${cache.join('')}>` :  `🎉 Winners: ${cache.join('\n')}`}`).setFooter(`Giveaway ended!`);

        message.edit(winner_embed);
        return db.prepare('UPDATE giveaways SET ended=\'true\' WHERE message=?').run(giveaway.message);

    } catch (error) {
        console.log(`[ERROR] - at endGiveaway() function\n`, error.stack)
    }   
}

Map.prototype.randomUser = function(amount = 1){
    let array = [];
    let keys = Array.from(this.keys());
    while(array.length < amount) {
        let element = keys[Math.floor(Math.random() * keys.length)];
        if(!array.includes(element)) array.push(element);
    }
    return array
  }
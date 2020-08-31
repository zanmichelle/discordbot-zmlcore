const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class RerollCommand extends BaseCommand {
    constructor() {
        super('reroll', 'giveaways', [],'This is command description.', [], "reroll", ['REQUIRED_PERMS']);
    }

    async run(client, message, args) {
        try{
            if(!args[0] || isNaN(args[0])) return message.channel.send(`Missing argument, giveaway id must be a number.`);

            let giveaway = await db.prepare('SELECT * FROM giveaways WHERE message=?').get(args[0]);
            if(!giveaway) return message.channel.send(`Invalid giveaway id.`);
            if(giveaway.ended == 'false') return message.channel.send(`Giveaway is still running.`);
            

            endGiveaway(giveaway);
        }catch(err){console.log('[ERROR] - at REROLL', err.stack)}


        async function endGiveaway(giveaway) {
            try {
                let message = await client.channels.cache.get(giveaway.channel).messages.fetch(giveaway.message);
        
                let all = await message.reactions.cache.get('🎉').users.fetch();
                let users = all.filter(u => !u.bot);
        
                let user = users.randomUser();
                let cache = []
                user.forEach(u=>{
                    cache.push(`<@${u}>`)
                });
        
                let win_message = giveaway.amount = 1 ? `Rerolled winner of the **${giveaway.amount} ${giveaway.reward}** is ${cache.join("")}` : `Rerolled winners for the **${giveaway.amount} ${giveaway.reward}** are: ${cache.join(', ')}!`;
                win_message+=`\n\nLink to the giveaway: https://discord.com/channels/${giveaway.guild_id}/${giveaway.channel}/${giveaway.message}`
                message.channel.send(win_message);
        
                let winner_embed = new MessageEmbed()
                .setTitle(`🎁 ${giveaway.reward}`)
                .setDescription(`${giveaway.amount == 1 ? `🎉 Winner: <@${cache.join('')}>` :  `🎉 Winners: ${cache.join('\n')}`}`).setFooter(`Giveaway rerolled!`);
        
                message.edit(winner_embed);
                return db.prepare('UPDATE giveaways SET ended=\'true\' WHERE message=?').run(giveaway.message);
        
            } catch (error) {
                console.log(`[ERROR] - at endGiveaway() function\n`, error.stack)
            }   
        }
    }   
}


Map.prototype.randomUser = function(amount = 1){
    let array = [];
    let keys = Array.from(this.keys());
    while(array.length < amount) {
        let element = keys[Math.floor(Math.random() * keys.length)];
        if(!array.includes(element)) array.push(element);
    }
    return array;
  }
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
module.exports = class GiveawayEndEvent extends BaseEvent {
  constructor() {
    super('giveawayEnd');
  }
  
  async run(client, giveaway) {
    // console.log('GiveawayEnd event');
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
        let link = `https://discordapp.com/channels/${giveaway.guild_id}/${giveaway.channel}/${giveaway.message}`;
        // add check if user is still in the guild.

        let win_message = giveaway.amount = 1 ? `Winner of the **${giveaway.amount} ${giveaway.reward}** is ${cache.join("")}` : `Winners of the **${giveaway.amount} ${giveaway.reward}** are ${cache.join(', ')}!\n\n${link}`
        message.channel.send(win_message);

        let winner_embed = new MessageEmbed()
        .setTitle(`🎁 ${giveaway.reward}`)
        .setDescription(`${giveaway.amount == 1 ? `🎉 Winner: <@${cache.join('')}>` :  `🎉 Winners: ${cache.join('\n')}`}\n\nHosted by: <@${giveaway.creator}>`).setFooter(`Giveaway ended!`);

        message.edit(winner_embed);
        return db.prepare('UPDATE giveaways SET ended=\'true\' WHERE message=?').run(giveaway.message);

    } catch (error) {
        console.log(`[ERROR] - at GiveawayEnd Event\n`, error.stack)
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
    return array
  }
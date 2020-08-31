// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
module.exports = class WarnEvent extends BaseEvent {
  constructor() {
    super('userWarn');
  }
  
  async run(client, guild, user, reason) {
    console.log('Warn event',guild.id, user, reason);
    try {
        console.log(client.settings.get(guild.id))
        if(client.settings.get(guild.id).automod == 'false') return

        let warns = db.prepare('SELECT * FROM warnings WHERE guild_id=? AND member=?').all('','')

    } catch (error) {
        console.log(`[ERROR] - at Warn Event\n`,error.stack)
    }
  }
}
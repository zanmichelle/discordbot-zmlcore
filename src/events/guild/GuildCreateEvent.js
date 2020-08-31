// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate

const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  
  async run(client, guild) {
    try {
      let general = await db.prepare('SELECT * FROM guilds WHERE guild_id = ?').get(guild.id);
      if(general) return
      db.prepare('INSERT INTO guilds(guild_id) VALUES (?)').run(guild.id);
      
      let data = await db.prepare('SELECT * FROM guilds WHERE guild_id=?').get(guild.id);
      client.settings.set(guild.id,data)
      return console.log(`[GUILD SAVED] - Added ${guild.name} to database.`)
    } catch (error) {
      console.log(`[ERROR] - at GuildCreate EVENT\n`,error.stack)
    }
    
  }
}
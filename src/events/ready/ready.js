const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    try{
      console.log(`${"\x1b[32m"}[ZML-CORE] - Logged in (${client.user.username})${"\x1b[0m"}`)
      // loop thru guild if there is any new ones.
      client.guilds.cache.forEach(async guild => {
        try{
          let general = await db.prepare('SELECT * FROM guilds WHERE guild_id = ?').get(`${guild.id}`);

          if(general) return;
          let shop = {};
          let disabled = [];
          let filter = [];
          db.prepare('INSERT INTO guilds VALUES (?,?,?,?,?,?,?,?,?,?)').run(guild.id,'null','null','null','null','null','null', JSON.stringify(shop), JSON.stringify(disabled), 'false', JSON.stringify(filter));
          return console.log(`[GUILD SAVED] - Added ${guild.name} to database.`)
        }catch(err){console.log(`[ERROR] - Caching guilds and checking if all are in the db.\n`, err.stack)}
      });
    }catch(err){ return console.log(`[ERROR] - READY event`,err.stack);}
  }
}
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    client.user.setActivity(`-help | giveaways, moderation, economy`, {type: "LISTENING"}); 
    console.log(`${"\x1b[32m"}[ZML-CORE] - Logged in (${client.user.username})${"\x1b[0m"}`)
    try{
      // set all data to client.settings
      console.log('\n')
      console.time(`Fetching guild settings from database`)
      let data = db.prepare('SELECT * FROM guilds').all();
      data.forEach(g=>{
        client.settings.set(g.guild_id,g)
      });
      console.timeEnd(`Fetching guild settings from database`)

      // giveaway cache
      console.log('\n')
      console.time(`Caching all active giveaways to the client`);
      let giveaways = db.prepare('SELECT * FROM giveaways').all();
      giveaways.forEach(giveaway => {
        if(giveaway.ended == 'true') return
        let cache = {
          in_guild: giveaway.in_guild == 'null' ? 'null' : giveaway.in_guild,
          req: giveaway.in_guild == 'null' ? false : true
        }
        client.giveaways.set(giveaway.message,cache);
        // console.log(giveaway.message,cache)
      });
      console.timeEnd(`Caching all active giveaways to the client`)

      console.log('\n')
      console.time(`Disabled command cache`)
      // loop thru guild if there is any new ones.
      client.guilds.cache.forEach(async guild => {
        try{
          const disabled = db.prepare('SELECT * FROM disabled WHERE guild_id = ?').all(guild.id);
          if(disabled){
            disabled.forEach(d=>{
              client.disabledCommands.set(`${guild.id}_${d.command}`,d.disabled_by)
            });
          }
          const shop = db.prepare('SELECT * FROM shop WHERE guild_id=?').all(guild.id);
          if(shop) {
            client.shop.set(guild.id,shop);
          }
          let general = await db.prepare('SELECT * FROM guilds WHERE guild_id = ?').get(guild.id);
          if(general) return
          db.prepare('INSERT INTO guilds(guild_id) VALUES (?)').run(guild.id);
          return console.log(`[GUILD SAVED] - Added ${guild.name} to database.`)
        }catch(err){console.log(`[ERROR] - Caching guilds and checking if all are in the db.\n`, err.stack)}
      });
      console.timeEnd(`Disabled command cache`);
    }catch(err){ return console.log(`[ERROR] - READY event`,err.stack);}
  }
}
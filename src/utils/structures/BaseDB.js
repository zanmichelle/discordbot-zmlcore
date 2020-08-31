const database = require("better-sqlite3");
const db = new database(__dirname + '/database.db'/*,{ verbose: vrb }*/);
(async()=>{
    try{
        db.prepare('CREATE TABLE IF NOT EXISTS guilds (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT UNIQUE , prefix TEXT DEFAULT "-" NOT NULL, welcome TEXT DEFAULT "null" NOT NULL, log TEXT DEFAULT "null" NOT NULL, join_msg TEXT DEFAULT "null" NOT NULL, join_img TEXT DEFAULT "null" NOT NULL, join_role TEXT DEFAULT "null" NOT NULL, automod TEXT DEFAULT "false" NOT NULL, premium TEXT DEFAULT "false" NOT NULL, activated_by TEXT DEFAULT "null" NOT NULL)').run()
        // another table filter (id,guild_id,allowed,not_allowed) and 2 tables called allowed and not_allowed with id,guild_id,word

        //economy
        db.prepare(`CREATE TABLE IF NOT EXISTS economy (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, member TEXT, money INT DEFAULT 1000 NOT NULL, bank INT DEFAULT 0 NOT NULL, xp INT DEFAULT 0 NOT NULL, level INT DEFAULT 0 NOT NULL, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))`).run();
        //premium
        db.prepare(`CREATE TABLE IF NOT EXISTS premium (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, member TEXT, activates INT, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))`).run();
        //warnings
        db.prepare('CREATE TABLE IF NOT EXISTS warnings (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, member TEXT, moderator TEXT, reason TEXT, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))').run();
        //shop
        db.prepare('CREATE TABLE IF NOT EXISTS shop (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, item TEXT, role TEXT, price INT, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))').run();
        //disabled
        db.prepare('CREATE TABLE IF NOT EXISTS disabled (id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, command TEXT, disabled_by TEXT, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))').run();

        //giveawats
        db.prepare('CREATE TABLE IF NOT EXISTS giveaways(id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, channel TEXT, message TEXT, creator TEXT, reward TEXT, amount INT, in_guild TEXT DEFAULT "null" NOT NULL, invite TEXT DEFAULT "null" NOT NULL, start_at INT, end_at INT, ended TEXT DEFAULT "false" NOT NULL)').run();

        // jobs
        db.prepare('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY AUTOINCREMENT, job_name TEXT, jon_description TEXT, hourly_rate INT)');

        // custom commands
        db.prepare('CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY AUTOINCREMENT, guild_id TEXT, command_name TEXT, response BLOB, FOREIGN KEY(guild_id) REFERENCES guilds(guild_id))').run()
    }catch(err){
        console.log(`[ERROR] - BaseDB\n`,err.stack)
    }
})();

exports.db = db
async function vrb(txt){
    return console.log(`${"\x1b[35m"}[DATABASE]${"\x1b[0m"} - ${txt}`)
}
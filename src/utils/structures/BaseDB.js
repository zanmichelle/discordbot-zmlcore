const database = require("better-sqlite3");
const db = new database('../database.db',{ verbose: vrb });
(async()=>{
    try{
        db.prepare('CREATE TABLE IF NOT EXISTS guilds (id INT PRIMARY KEY AUTOINCREMENT,guild_id TEXT PRIMARY KEY, prefix TEXT, welcome TEXT, log TEXT, join_msg TEXT, join_img TEXT, join_role TEXT, automod TEXT, filter BLOB)').run()
        db.prepare(`CREATE TABLE IF NOT EXISTS economy (id INT PRIMARY KEY AUTOINCREMENT, guild_id TEXT FOREIGN KEY, member TEXT, money INT, bank INT, level BLOB)`).run();
        db.prepare('CREATE TABLE IF NOT EXISTS warnings (id INT PRIMARY KEY AUTOINCREMENT, guild_id TEXT FOREIGN KEY, member TEXT, moderator TEXT, reason TEXT)').run();
        db.prepare('CREATE TABLE IF NOT EXISTS warnings (id INT PRIMARY KEY AUTOINCREMENT, guild_id TEXT FOREIGN KEY, item TEXT, role TEXT, price INT').run();
    }catch(err){console.log(`[ERROR] - BaseDB`,err.stack)}
    
})();

exports.db = db
async function vrb(txt){
    return console.log(`${"\x1b[35m"}[GENERAL]${"\x1b[0m"} - ${txt}`)
}
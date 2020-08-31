const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class PremiumCommand extends BaseCommand {
    constructor() {
        super('premium', 'admin', [],'Bot admin only', ['SEND_MESSAGES'], "premium", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(!args[0] || !args[1]) return message.channel.send(`Invalid usage.`);
            let user = message.mentions.members.first().id || message.mentions.users.first().id || client.users.cache.get(args[1]) || client.users.cache.get(args[1].replace(/\[@<>&!#]+/g,'')).id;
            let check;
            switch (args[0].toLowerCase()) {
                case 'give':
                    try {
                        check = await db.prepare('SELECT * FROM premium WHERE member=?').get(user);
                        if(!check) {db.prepare('INSERT INTO premium(guild_id,member,activates) VALUES(?,?,?)').run('null',user,0); message.channel.send(`<@${user}> Has now premium!`);client.users.cache.get(user).send(`💠 **You may use premium features now!**`).catch(e=>message.channel.send(`Couldn't dm the user.`));}
                        else return message.channel.send(`User already has premium.`);
                    } catch (error) {
                        console.log(`[ERROR] - at premuim command case: give\n`,error.stack);
                    }
                break;

                case 'remove':
                    try {
                        check = await db.prepare('SELECT * FROM premium WHERE member=?').get(user);
                        if(!check) return message.channel.send(`User doesn't have premium.`);
                        client.users.cache.get(user).send(`❗️ **You may no longer use premium features!**`).catch(e=>message.channel.send(`Couldn't dm the user.`));
                        db.prepare('DELETE FROM premium WHERE member=?').run(user);
                        db.prepare('UPDATE guilds SET premium=\'false\' WHERE activated_by=?').run(user);

                    } catch (error) {
                        console.log(`[ERROR] - at premuim command case: take\n`,error.stack);
                    }
                break;
            }
        }catch(err){console.log('[ERROR] - at PREMIUM', err.stack)}
    }
}
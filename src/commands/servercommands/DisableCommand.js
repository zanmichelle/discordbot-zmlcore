const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed, Message} = require('discord.js');
const ms = require('ms');
const pretty = require('pretty-ms')

module.exports = class DisableCommand extends BaseCommand {
    constructor() {
        super('disable', 'servercommands', [],'Disable commands for your server.', ['MANAGE_GUILD'], "disable [command]", ['SEND_MESSAGES'], 5);
    }

    async run(client, message, args) {
        try{
            if(!args[0]) return list();
            const command = args[0].toLowerCase();
            let u = ['help', 'disable', 'settings', 'set', 'botinfo']
            if(u.includes(command)) return message.channel.send(`You can't disable this command.`)
            if(!client.commands.get(command)) return message.channel.send(`Specifiy the command in order to disable/enable it.`);
            const checked = await client.database.prepare('SELECT * FROM disabled WHERE guild_id=? AND command=?').get(message.guild.id, command);
            if(checked){
                await client.database.prepare('DELETE FROM disabled WHERE guild_id=? AND command=?').run(message.guild.id,command);
                const embed = new MessageEmbed().setThumbnail(message.guild.iconURL())
                .setDescription(`Command **${command}** is no longer disabeld.`)
                .setTimestamp(pretty(Date.now()));
                await client.disabledCommands.delete(`${message.guild.id}_${command}`);
                return message.channel.send(embed);
            }else{
                await client.database.prepare('INSERT INTO disabled(guild_id,command,disabled_by) VALUES(?,?,?)').run(message.guild.id,command,message.author.id);
                const embed = new MessageEmbed().setThumbnail(message.author.displayAvatarURL())
                .setDescription(`Command **${command}** is now disabeld.\nDisabled by: ${message.author}`)
                .setTimestamp(pretty(Date.now()));
                await client.disabledCommands.set(`${message.guild.id}_${command}`,message.author.id)
                return message.channel.send(embed);
            }
        }catch(err){console.error('[ERROR] - at DISABLE', err.stack)}

        async function list() {
            try{
                const commands = await client.database.prepare('SELECT * FROM disabled WHERE guild_id = ?').all(message.guild.id);
                if(!commands.length || commands.length > 1) return message.reply(`there aren't any disabled commands. If you want to disable one type: \`disable [command]\`.`);
                const data = []
                commands.forEach(cmd => {
                    data.push(`**${cmd.command}** - <@${cmd.disabled_by}>`)
                });
                const embed = new MessageEmbed().setTitle(`Disabled commands in ${message.guild.name}:`)
                .setDescription(data.join(',\n'));
                return message.channel.send(embed);
            }catch(err){console.error('[ERROR] - at DISABLE_list function', err.stack)}
            
        }
    }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js")
const {db} = require("../../utils/structures/BaseDB");

module.exports = class SettingsCommand extends BaseCommand {
  constructor() {
    super('settings', 'servercommands', ['set','config','configure'],'Use this command to configure settings for your server.', ['ADMINISTRATOR','MANAGE_GUILD'], "settings <module> <option>", ['SEND_MESSAGES']);
  }

  async run(client, message, args) {
    try{ 
      let insert = ''
      let embed = new Discord.MessageEmbed();
      let data = {}
      let temp = await client.settings.get(message.guild.id);
      // console.log(temp)
      // check if user has permission to run the command.
      if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== message.guild.owner.id) {let msg = await message.reply(`You need \`ADMINISTRATOR\` permission or you have to be guild owner. `); return msg.delete({timeout: 4000});}
      if(args[0]){
        if(temp[args[0].toLowerCase()] && args.length > 1) {

          switch (args[0].toLowerCase()) {
            case 'prefix':
              let newPrefix = args.slice(1).join(" ");
              if(temp.prefix == newPrefix) return message.channel.send(`**Prefix is already set to \`${newPrefix}\`.**`)
              db.prepare(`UPDATE guilds SET prefix = ? WHERE guild_id = ?`).run(args[1],message.guild.id);
              temp["prefix"] = newPrefix;
              client.settings.set(message.guild.id,temp);
              message.channel.send({embed: new Discord.MessageEmbed().setDescription(`☑️ Set prefix to **${newPrefix}**`)})
            break;

            case 'welcome':
              let welcome = message.guild.channels.cache.get(args[1].replace(/[@!#&<>]+/g,"")) || message.mentions.channels.first()
              if(!welcome) return message.channel.send(`Second parameter must be an actually channel.`).then(m=>m.delete({timeout:5000}));
              db.prepare('UPDATE guilds SET welcome = ? WHERE guild_id = ?').run(welcome.id, message.guild.id);
              temp["welcome"] = welcome.id
              client.settings.set(message.guild.id,temp);
              message.channel.send(embed.setDescription(`☑️ Successfully updated **welcome** channel to ${welcome}!`))
            break;

            case 'log':
              let log = message.guild.channels.cache.get(args[1].replace(/[@!#&<>]+/g,"")) || message.mentions.channels.first();
              if(!log) return message.channel.send(`Second parameter must be an actually channel.`).then(m=>m.delete({timeout:5000}));
              db.prepare('UPDATE guilds SET log = ? WHERE guild_id = ?').run(log.id, message.guild.id);
              temp["log"] = log.id;
              client.settings.set(message.guild.id,temp);
              message.channel.send(embed.setDescription(`☑️ Successfully updated **log** channel to ${log}!`))
            break;
            
            case 'join_msg':
              let join_msg = args.slice(1).join(" ");
              if(!join_msg) return message.channel.send(`Missing message.`)
              db.prepare('UPDATE guilds set join_msg = ? WHERE guild_id = ?').run(join_msg, message.guild.id);
              temp["join_msg"] = join_msg
              client.settings.set(message.guild.id,temp);
              message.channel.send(embed.setDescription(`☑️ Successfully updated **join_msg** channel to \`${join_msg}\`!`));
            break;

            case 'join_role':
              let role = message.guild.roles.cache.get(args[1].replace(/[@!#&<>]+/g,"")) || message.mentions.roles.first();
              if(!role) return message.channel.send(`Invalid role metion or ID.`);
              db.prepare('UPDATE guilds set join_role = ? WHERE guild_id = ?').run(role.id, message.guild.id);
              temp["join_role"] = role.id
              client.settings.set(message.guild.id,temp);
              message.channel.send(embed.setDescription(`☑️ Successfully updated **join_role** role to \`${role}\`!`));
            break;
            default:
              return getSettings();
            break;
          }

        }
        else return getSettings();

      }else return getSettings();


     }catch(err){ message.channel.send(`[ERROR] \`${err.name}\``); return console.log(`[ERROR] - SETTINGS COMMAND`,err.stack) }
    async function getSettings(){
      try{
        let settings = await db.prepare('SELECT * FROM guilds WHERE guild_id = ?').get(message.guild.id);
        let embed = new Discord.MessageEmbed().setFooter(`Settings for ${message.guild.name}`).setTitle('⚙️ SETTINGS')
          .setDescription(`${settings.prefix == 'null' ? "This guild didn't setup custom prefix." : `Prefix for this guild is: \`${settings.prefix}\``}
          \n__***Description:***__\n\`welcome\` & \`log\` are channels for welcome messages (when new member joins) and for logs as channel where executions of moderation commands are executed.
          \n\`join_msg\` & \`join_role\` are for custom message when new member joins (*use [user] for user tag, [guild] for server name & [number] to get placement when someone joined*).`)
          .addField(`📝 **CHANNELS:**`,`**welcome** - ${settings.welcome == 'null' ? '`null`' : `<#${settings.welcome}>`}\n**log** - ${settings.log == 'null' ? '`null`' : `<#${settings.log}>`}`,true)
          .addField(`👋 **JOIN SETTINGS:**`,`**join_msg** - \`${settings.join_msg.replace(/\`+/g,"")}\`\n**join_img** - ${settings.join_img == 'null' ? '`null`' : `[image](${settings.join_img})`}\n**join_role** - ${settings.join_role == 'null' ? '`null`' : `<@&${settings.join_role}>`}`,true)
          return message.channel.send(embed);
      }catch(err){console.log(`[ERROR] - function getSettings() in [SETTINGS command]\n`,err.stack)}
      
    }
  }
}


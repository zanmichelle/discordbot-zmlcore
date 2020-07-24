const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const Discord = require('discord.js');

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'moderation', [],'Creates a poll for votes.', ['MANAGE_GUILD','ADMINISTRATOR'], "poll <text_here> + <options separated by | >",['SEND_MESSAGES', 'ADD_REACTIONS']);
  }

  async run(client, message, args) {
    try{
      if(!args[0]) return message.channel.send(`Specify arguments.`)
      let content = args.join(" ")
      let text = content.split(/\++/g)[0];
      let options = content.split(/\++/g)[1];

      if(!text || !options) return message.channel.send(`Invalid form of poll, use: \`poll <text> + options1 | option2 | option3\`.`)
      options = options.split(/\|+/g)

      let list = [];
      let reactions = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
      for(let i=0;i<options.length;i++){
        list.push(`${reactions[i]} **${options[i]}**`)
      }
      
      let embed = new Discord.MessageEmbed().setTitle(`📥 POLL`)
      .setDescription(`${text}\n\n*(Vote by reacting to poll)*\n${list.join("\n")}`)
      let msg = await message.channel.send(embed);
      for(let j=0;j<options.length;j++){
        await msg.react(reactions[j])
      }
    }catch(err){console.log(`[ERROR] - at POLL`, err.stack)}
  }
}
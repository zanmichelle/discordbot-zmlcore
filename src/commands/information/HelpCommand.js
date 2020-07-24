const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js")
const math = require("mathjs")
module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', ['h'],'This command shows help menu.', ['SEND_MESSAGES'],"help [page | command]",["SEND_MESSAGES"]);
  }

  async run(client, message, args) {
    try{
      if(args[0] && client.commands.get(args[0].toLowerCase())){
        let cmd = client.commands.get(args[0].toLowerCase())
        let embed = new MessageEmbed().setTitle(`Command help: ${cmd.name}`)
        .setDescription(`**Category:** ${cmd.category}\n**Aliases:** ${cmd.aliases.length > 0 ? `*${cmd.aliases.join(", ")}*` : `N/A`}\n**Description:** ${cmd.description}\n**Permissions:** ${cmd.memberPerms.length > 0 ? `\`${cmd.memberPerms.join(", ")}\`` : `N/A`}\n**Required Permissions:** ${cmd.clientPerms.length > 0 ? `\`${cmd.clientPerms.join(", ")}\`` : `N/A`}`)
        .addField(`USAGE:`, `\`\`\`${cmd.usage}\`\`\``)
        .setTimestamp(new Date());
        return message.channel.send(embed)
      }else{
        let page = isNaN(args[0]) ? 1 : parseInt(args[0])
        let data = []
        let check = []
        await client.commands.forEach(command=>{
          if(check.includes(command.name)) return
          check.push(command.name)
          data.push(`**\`${client.prefix}${client.commands.get(command.name).usage}\`** - ${client.commands.get(command.name).description}`)
        });
        message.channel.send(convertToPage(data,page))
        
      }
    }catch(error){
      console.log(error.stack)
    }
  }
}

function convertToPage(dataArray, page) {
  let pageData = []
  let perPage;
  let entitiesPerPage = 10
  if(!entitiesPerPage || isNaN(entitiesPerPage)) perPage = 20
  else perPage = entitiesPerPage
  let numb1 = perPage/2

  let dataLength = dataArray.length
  let calc1 = Math.ceil(dataLength / numb1)
  let calc2 = calc1 * numb1

  let totalpages = math.round(`${math.evaluate(calc2 / perPage)}`)

  if(totalpages < 1) totalpages = 1
  let currentpage = 1

  if(!page || isNaN(parseInt(page))) currentpage = 1
  else currentpage = parseInt(page)

  if(currentpage > totalpages) currentpage = totalpages 

  if(currentpage == 1) {
  dataArray.forEach(player => {
      if(dataArray.indexOf(player) < perPage) {
          pageData.push(`${player}`)
      }
  })
  }
  else {
      let newthing = dataArray.slice(math.evaluate(perPage*(currentpage-1)))
      newthing.forEach(player => {
        if(newthing.indexOf(player) < perPage) {
            pageData.push(`${player}`)
        }
      })
  }


  let embed = new MessageEmbed().setTitle(`Help Menu`)
  .setDescription(`${pageData.join("\n")}`)
  .setFooter(`Page ${currentpage}/${totalpages}`)
  .setTimestamp()
  return embed;
}
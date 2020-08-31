const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class EmbedCommand extends BaseCommand {
    constructor() {
        super('embed', 'servercommands', ['e'],'Create embeds easly and fast!.', ['MANAGE_GUILD'], "embed <flags> (-t title, -c hex_color, -d description, -f footer)", ['MANAGE_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(!message.content.toLowerCase().includes(`-`)) return message.channel.send(`Missing arguments.`)
            let argu = args.join(" ")

            let embed = new MessageEmbed();
            let embedObjects = []

            let titlematch = argu.match(/-t [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g)
            if(titlematch) {
                embed.setTitle(titlematch[0].split(/ +/g).slice(1).join(" ").split("\\n").join("\n"))
                embedObjects.push(`t`)
            }

            let colormatch = argu.match(/-c (\#?[a-fA-z0-9]{6})+/g);
            if(colormatch) {
                    embed.setColor(colormatch[0].split(/ +/g)[1]);
                    embedObjects.push(`c`);
            }

            let footermatch = argu.match(/-f [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g)
            if(footermatch) {
                embed.setFooter(footermatch[0].split(/ +/g).slice(1).join(" ").split("\\n").join("\n"))
                embedObjects.push(`f`)
            }

            let descmatch = argu.match(/-d [\w !<>[\]\\@#$%^&*()_+={};:'"/?.>,<:`]+/g)
            if(descmatch) {
                embed.setDescription(descmatch[0].split(/ +/g).slice(1).join(" ").split("\\n").join("\n"))
                embedObjects.push(`d`)
            }

            if(embedObjects.length == 0) return message.channel.send(`There was an error parsing your argu or you didn't include the correct flags.`);
            message.channel.send(embed);
            message.delete();
        }catch(err){console.log('[ERROR] - at EMBED', err.stack)}
    }
}
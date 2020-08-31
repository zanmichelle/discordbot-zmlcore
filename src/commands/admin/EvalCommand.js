const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = class EvalCommand extends BaseCommand {
    constructor() {
        super('eval', 'admin', [],'', ['SEND_MESSAGES'], "eval", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(message.author.id !== '304870309779996672') return
            let toEval = eval(args.join(" "));
            return message.channel.send({embed: new MessageEmbed().setDescription(`Result:\n\`\`\`js\n${toEval}\`\`\``)});
        }catch(err){console.log('[ERROR] - at EVAL', err.stack)}
    }
}
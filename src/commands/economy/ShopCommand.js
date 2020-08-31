const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class ShopCommand extends BaseCommand {
    constructor() {
        super('shop', 'economy', [],'Add or remove items from guild shop!.', ['ADMINISTRATOR'], "shop <add/remove/list> <role> <price> [Displayname/desc of an item]", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        try{
            if(!args[0]) return message.channel.send(`Missing arguemnts!`);
            switch(args[0].toLowerCase()){
                case "add":
                    
                break;

                case "remove":
                break;

                case "list":
                break;
            }
        }catch(err){console.log('[ERROR] - at SHOP', err.stack)}
    }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class SlotsCommand extends BaseCommand {
    constructor() {
        super('slots', 'economy', ['aliases'],'Slot machine is here, palce bets.', [], "slots <bet>", ['SEND_MESSAGES']);
    }

    async run(client, message, args) {
        let slots = {
            "apple":{emoji: '🍏', name: 'apple', points: 3},
            "pear":{emoji: '🍐', name: 'pear', points: 2},
            "cherry":{emoji: '🍒', name: 'cherry', points: 4},
            "pineapple":{emoji: '🍍', name: 'pineapple', points: 5},
            "potato":{emoji: '🥔', name: 'potato', points: 0},
            "lollypop":{emoji: '🍭', name: 'lollypop', points: 6},
            "jackpot":{emoji: '🤑', name: 'jackpot', points: 10}
        };
        let options = ["apple","pear","cherry","pineapple","potato","lollypop","jackpot"]
        let msg = '';
        let embed = new MessageEmbed().setTitle(`Slots 🎰`).setDescription(`Loading...`)
        try{
            if(!args[0] || isNaN(args[0])) return message.channel.send({embed: new MessageEmbed().setDescription(`Provide a number for a bet.`)}).then(m=>m.delete({timeout: 5000}));
            let bet = parseInt(args[0]);
            let data = await client.economy.prepare(`SELECT * FROM guild${message.guild.id} WHERE member=?`).get(message.author.id);
            if(!data){
                let items = {}
                await client.economy.prepare(`INSERT INTO guild${message.guild.id} VALUES(?,?,?,?)`).run(message.author.id, 1000, 0, JSON.stringify(items));
            }
            let { money } = await client.economy.prepare(`SELECT * FROM guild${message.guild.id} WHERE member=?`).get(message.author.id);
            if(bet > money) return message.channel.send(`You don't have enough money, max amount: $${money}.`);
            
            msg = await message.channel.send(embed);
            await slotMachine(bet);
        }catch(err){console.log('[ERROR] - at SLOTS', err.stack)}

        async function slotMachine(bet){
            let game = [];
            let names = []
            for(let x=0;x<4;x++){
                game = [];
                for(let i=0;i < 3;i++){
                    let temp = ''
                    let tempnames = []
                    for(let j=0;j<3;j++){
                        let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                        temp+=s.emoji
                        tempnames.push(s.name)
                    }
                    if(i==1) temp+='⬅'
                    game.push(temp);
                    names.push(tempnames)
                }
                msg.edit(embed.setDescription(game.join("\n")));
            }
            results(names[1],bet)
        }
        function results(a,amount){
            let e = a
            let three = e[0] == e[1] && e[0] == e[2];
            let two = e[0] == e[1] || e[0] == e[2] || e[1] == e[2];
            console.log(e)
            msg.edit(embed.setDescription(slots[e[0]].emoji+slots[e[1]].emoji+slots[e[2]].emoji))
            if(three){
                if(e.includes('jackpot')){
                    let newMoney = Math.floor(amount * 10);
                    let embed = new MessageEmbed().setTitle(`💰**JACKPOT**💰`)
                        .setDescription(`<@${message.author.id}> **GG** you won \`$${newMoney}\`!`)
                    message.channel.send(embed)
                    return updateMoney(newMoney,amount);
                }
                else{
                    let newMoney = Math.floor(amount * (slots[e[0]].points))
                    let embed = new MessageEmbed().setDescription(`<@${message.author.id}> **GG** you won \`$${newMoney}\`!`)
                    message.channel.send(embed);
                    return updateMoney(newMoney,amount);
                }
                
            }
            else if(two){
                let newMoney = Math.floor(amount * ((slots[e[0]].points + slots[e[1]].points + slots[e[2]].points)/2))
                let embed = new MessageEmbed().setDescription(`**<@${message.author.id}> you won \`$${newMoney}\`!**`)
                message.channel.send(embed)
                return updateMoney(newMoney,amount);
            }
            else{
                let embed = new MessageEmbed().setDescription(`🥃 You lost..`)
                message.channel.send(embed)
                return updateMoney(0,amount);
            }
        }
        async function updateMoney(amount,bet){
            let {money} = await client.economy.prepare(`SELECT money FROM guild${message.guild.id} WHERE member=?`).get(message.author.id);
            let n = Math.floor(money - bet + amount)
            await client.economy.prepare(`UPDATE guild${message.guild.id} SET money=? WHERE member=?`).run(parseInt(n),message.author.id)
        }
    }
}
const readline = require("readline");
const fs = require('fs')
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const q = (str) => new Promise(resolve=> rl.question(str,resolve));

(async()=>{
    let name = await q(`Command name: `)
    let category = await q('Category: ')

    await writeCommand(name,category);
    return console.log(`[COMMAND] Generated new command at '${category}/${name.charAt(0).toUpperCase()+name.slice(1)}Command.js' !`)
})();


async function writeCommand(name,category){
    let data = `const BaseCommand = require('../../utils/structures/BaseCommand');
const {db} = require('../../utils/structures/BaseDB');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class ${name.charAt(0).toUpperCase()+name.slice(1)}Command extends BaseCommand {
    constructor() {
        super('${name.toLowerCase()}', '${category.toLowerCase()}', [],'This is command description.', [], "${name.toLowerCase()}", ['REQUIRED_PERMS']);
    }

    async run(client, message, args) {
        try{
            
        }catch(err){console.log('[ERROR] - at ${name.toUpperCase()}', err.stack)}
    }
}`
    fs.writeFileSync(`./src/commands/${category}/${name.charAt(0).toUpperCase()+name.slice(1)}Command.js`,data)
    return setTimeout(() => {
        process.exit();
    }, 1000); 
}

process.on('uncaughtException', (e)=>{});process.on('unhandledRejection', (e)=>{});
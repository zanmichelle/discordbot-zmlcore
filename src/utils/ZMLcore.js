require('dotenv').config();
const {Client} = require("discord.js");
const { registerCommands, registerEvents } = require('./registry');

const database = require("better-sqlite3");
let {db} = require('../utils/structures/BaseDB')

module.exports = class ZMLclient extends Client{
    constructor(options){
        super(options);

        


        this.commands = new Map();
        this.events = new Map();
        this.prefix = process.env.DISCORD_BOT_PREFIX;
        this.login(process.env.DISCORD_BOT_TOKEN);

        // database assigment here:
        this.database = db
    }
    /**
     * @param {options} options - disable everyone, or partials, etc...
     */
    async init(){
        await registerCommands(this, '../commands');
        await registerEvents(this, '../events');
    }
}
async function eco(txt){
    return console.log(`${"\x1b[35m"}[ECONOMY]${"\x1b[0m"} - ${txt}`)
}
async function warn(txt){
    return console.log(`${"\x1b[35m"}[WARNINGS]${"\x1b[0m"} - ${txt}`)
}
async function giveaway(txt){
    return console.log(`${"\x1b[35m"}[GIVEAWAYS]${"\x1b[0m"} - ${txt}`)
}
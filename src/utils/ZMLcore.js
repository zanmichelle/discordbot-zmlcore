require('dotenv').config();
const {Client, Collection} = require("discord.js");
const { registerCommands, registerEvents } = require('./registry');

const database = require("better-sqlite3");
let {db} = require('../utils/structures/BaseDB')

module.exports = class ZMLclient extends Client{
    constructor(options){
        /**
         * @property {commands} this.commands
         * @property {events} this.events
         */
        super(options);

        this.commands = new Map();
        this.events = new Map();
        this.cooldowns = new Collection();
        this.settings = new Collection();
        this.disabledCommands = new Collection();
        this.giveaways = new Collection();
        this.help = {};
        this.owner = process.env.OWNER;
        this.shop = new Collection();
        
        this.prefix = process.env.DISCORD_BOT_PREFIX;
        this.login(process.env.DISCORD_BOT_TOKEN);
        this.timer = function timer(callback, delay) {
            var id, started, remaining = delay, running
          
            this.start = function() {
                running = true
                started = new Date()
                id = setTimeout(callback, remaining)
            }
          
            this.pause = function() {
                running = false
                clearTimeout(id)
                remaining -= new Date() - started
            }
          
            this.getTimeLeft = function() {
                if (running) {
                    this.pause()
                    this.start()
                }
          
                return remaining
            }
          
            this.getStateRunning = function() {
                return running
            }
          
            this.start()
          };

        // database assigment here:
        this.database = db
        this.init();
    }
    /**
     * @param {options} options - disable everyone, or partials, etc...
     */
    async init(){
        await registerCommands(this, '../commands');
        await registerEvents(this, '../events');
    }
}

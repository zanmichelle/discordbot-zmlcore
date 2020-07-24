// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  
  async run(client, reaction, user) {
    
  }
}
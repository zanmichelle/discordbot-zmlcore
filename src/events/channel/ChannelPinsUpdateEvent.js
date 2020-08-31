// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelPinsUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
const {db} = require('../../utils/structures/BaseDB');
module.exports = class ChannelPinsUpdateEvent extends BaseEvent {
  constructor() {
    super('channelPinsUpdate');
  }
  
  async run(client, channel) {
    
  }
}
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-error
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class ErrorEvent extends BaseEvent {
  constructor() {
    super('error');
  }
  
  async run(client, error) {
    console.log(error)
  }
}

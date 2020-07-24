const BaseCommand = require('../../utils/structures/BaseCommand');
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');


module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'test', ['t'],'This is command description.', [], "test",[]);
  }

  async run(client, message, args) {
    try{
      const canvas = createCanvas(600, 240);
      const ctx = canvas.getContext('2d');
      // Write "Awesome!"
      
      
      // Draw line under text
      
      var background = await loadImage(client.users.cache.get(message.author.id).displayAvatarURL({format: "jpg"}))
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.font = '30px Arial'
      ctx.textAlign= "center"
      ctx.fillText(`WELCOME! #${message.guild.members.cache.filter(m => !m.user.bot).size}`, canvas.width / 2, canvas.height /2)
      ctx.strokeText(`WELCOME! #${message.guild.members.cache.filter(m => !m.user.bot).size}`, canvas.width / 2, canvas.height /2,10)
      ctx.stroke()
      const attachemnt = new MessageAttachment(canvas.toBuffer(),"test.png")
      await message.channel.send(attachemnt)
    }catch(err){console.log(`[ERROR] - TestCommand\n`,err.stack);}
    message.channel.send('Test command works');
    console.log(message.member.roles.highest.rawPosition)
  }
}
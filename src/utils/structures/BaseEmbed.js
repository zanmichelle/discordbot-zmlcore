const {MessageEmbed} = require("discord.js");
const config = reload("../../../config.json")

function makeEmbed(color,footer){
    let embed = new MessageEmbed()
    embed.setColor(color ? color : config.discord.defaultembed.color);
    embed.setFooter(footer ? footer : config.discord.defaultembed.footer);

    return embed;
}

module.exports = {
    makeEmbed
}




function reload(f) {
    delete require.cache[require.resolve(f)];
    return require(f);
}
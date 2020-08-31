module.exports = class BaseCommand {
  constructor(name, category, aliases, description, memberPerms, usage, clientPerms, cooldown) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.description = description;
    this.memberPerms = memberPerms;
    this.usage = usage;
    this.clientPerms = clientPerms;
    this.cooldown = cooldown ? cooldown : 0;
  }
}
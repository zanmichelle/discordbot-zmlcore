module.exports = class BaseCooldown{
    constructor(guild, user, command, time){
        this.guild = guild;
        this.user= user;
        this.command = command;
        this.time = time;
    }

    add(){
        setTimeout(() => {
            delete this
        }, time*1000);
    }
}
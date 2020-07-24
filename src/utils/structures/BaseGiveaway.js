module.export = class BaseGiveaway{
    constructor(guild,channel,message,creator,winners,prize,time,required_guild,required_role){
        this.guild = guild;
        this.channel = channel;
        this.message = message;
        this.creator = creator;
        this.winners = winners;
        this.prize = prize;
        this.time - time;
        this.required_guild = required_guild;
        this.required_role = required_role;
    }


    /**
     * @param {guild} guildid id that giveaway is created.
     * @param {channel} channelid id required for updating giveaway time
     * @param {message} messageid id required for message updates.
     * @param {creator} creatorid id too see who hosted giveaway.
     * @param {winners} winners amount of winners
     * @param {prize} prize of the giveaway.
     * @param {time} time for the giveaway to end.
     * @param {required_guild} guildid members entering must be in a certain guild in order to join.
     * @param {required_role} roleid id thats required to have in certain guild.
     */


     async create(guild,channel,message,creator,prize){

     }
}
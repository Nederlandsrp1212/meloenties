const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "744253706848960632";

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij kan dit neit doen!");

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "🔰logs🔰");
        if (!ticketChannel) return message.reply("Kan het log kanaal niet vinden?");
        
    } else {
        message.channel.send("Gelieve dit commando te doen bij een ticket!");
    }

}

module.exports.help = {
    name: "closeticket"
}
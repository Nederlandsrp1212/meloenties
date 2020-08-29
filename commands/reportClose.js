const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "744977222158385305";

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij kan dit neit doen!");

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

    } else {
        message.channel.send("Gelieve dit commando te doen bij een report!");
    }

    var reportChannel = message.member.guild.channels.cache.find(channel => channel.name === "🔰logs🔰");
    if (!reportChannel) return message.reply("Kan het log kanaal niet vinden?");

}

module.exports.help = {
    name: "closereport"
}
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Server info")
        .setDescription("De informatie van de server")
        .setColor("#0000ff")
        .addFields(
            { name: "Bot naam", value: client.user.username },
            { name: "Jij bent de server gejoind op", value: message.member.joinedAt },
            { name: "Totaal aantal mensen op de server", value: message.guild.memberCount }
        )
        .setTimestamp();

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "serverinfo"
}
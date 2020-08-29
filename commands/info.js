const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Bot info")
        .setDescription("Informatie over de bot")
        .setColor("#0000ff")
        .addField("Bot naam", "**HulpSpecialist**")
        .addFields(
            { name: "Gejoind op", value: "14-08-2020" }
        )
        .setThumbnail("")
        .setImage("")
        .setFooter("")
        .setTimestamp();

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "info"
}
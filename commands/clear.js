const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !clear aantal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen toestemming");

    if (!args[0]) return message.reply("Geef een aantal op dat je weg wilt halen");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] <= 0) {
                message.reply("Ik kan helaas geen 0 berichten verwijderen!").then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] == 1) {
                message.reply("Ik heb 1 bericht verwijderd!").then(msg => msg.delete({ timeout: 3000 }));
            } else {
                message.reply(`Ik heb ${args[0]} bericht verwijderd!`).then(msg => msg.delete({ timeout: 3000 }));
            }

        })

    } else {
        return message.reply("Geef een getal op!");
    }

    var clearChannel = message.guild.channels.cache.find(channel => channel.name === "🔰logs🔰");
    if (!clearChannel) return message.reply("Kan het log kanaal niet vinden?");

}
module.exports.help = {
    name: "clear"
}
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // intakerol persoon 

    if (!message.member.hasPermission("OWNER")) return message.reply("Helaas kan jij dit niet doen!");

    if (!args[0]) return message.reply("Geen gebruiker meegegeven!");

    if (!message.guild.me.hasPermission("CONNECT")) return message.reply("Geen perms!");

    var intakePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!intakePerson) return message.reply("Gebruik niet gevonden!");

    if (intakePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Je kunt deze niet muten!");

    var intakeRole = message.guild.roles.cache.get('752108920402608149');
    if (!intakeRole) return message.channel.send("De rol muted bestaat niet!");

    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted dus kan niet meer praten!`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} is geunmute!`);

    }, ms(muteTime));

}
module.exports.help = {
    name: "intakerol"
}
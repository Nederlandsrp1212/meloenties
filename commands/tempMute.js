const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

    // tempmute persoon tijd h,m,s

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Helaas kan jij dit niet doen!");

    if (!args[0]) return message.reply("Geen gebruiker meegegeven!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms!");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("Gebruik niet gevonden!");

    if (mutePerson.hasPermission("KICK_MEMBERS")) return message.reply("Je kunt deze niet muten!");

    var muteRole = message.guild.roles.cache.get('743838009224593449');
    if (!muteRole) return message.channel.send("De rol muted bestaat niet!");

    var muteTime = args[0];

    if (!muteTime) return message.channel.send("Geen tijd opgegeven!");

    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted dus kan niet meer praten!`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} is geunmute!`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute"
}

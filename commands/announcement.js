const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !announcement title | bericht | kleur | kanaal

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Helaas kan jij dit neit doen!");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik van announcement!")
            .setColor("#ff0000")
            .setDescription(`Maak een announcement door gebruik te maken van: \n !announcement titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "log";
    if (argsList[3] === undefined) argsList[3] = "log";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle("Announcement")
        .setColor(options.kleur)
        .setDescription(`Announcement van ${message.author} \n\n ${options.titel} \n ${options.bericht}`)
        .setTimestamp();

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if (!channel) return message.reply("Het kanaal is niet gevonden");
    
    channel.send(announceEmbed);

    var annoChannel = message.member.guild.channels.cache.find(channels => channel.name === "logs");
    if (!annoChannel) return message.reply("Kan het log kanaal niet vinden?");
  
} 

module.exports.help = {
    name: "announcement"
}
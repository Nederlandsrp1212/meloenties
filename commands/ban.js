const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !ban @spelernaam redenen

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Helaas kan jij dit niet doen!");

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("Geen perms!");

    if (!args[0]) return message.reply("Geen gebruiker meegegeven!");

    if (!args[1]) return message.reply("Geen redenen meegegeven");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(0).join(" ");

    if (!banUser) return message.reply("Gebruik niet gevonden!");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("0000ff")
        .setTitle("Gelieve binnen 30 seconden te reageren!")
        .setDescription(`Wil je ${banUser} bannen??`);

    var embed = new discord.MessageEmbed()
        .setColor("ff0000")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Verbannen:** ${banUser} (${banUser.id})
            **Verbannen door:** ${message.author}
            **Reden** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✔", "❌"]);

        if (emoji == "✔") {

            msg.delete();

            banUser.ban(reason).catch(err => {
                if (err) return message.reply("Er is iets mis gegaan!");
            });

            message.channel.send(embed);

        } else if (emoji === "❌") {

            msg.delete();

            return message.reply("Ban geanuleerd").then(m => m.delete(5000));

        }

        // message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(collected => {

        //  if (collected.first().content.toLowerCase() == "ja") {

        //    kickUser.kick(reason).catch(err => {
        //        if (err) return message.reply("Er is iets mis gegaan?!")
        //     });

        //   }else {
        //       message.reply("Geannuleerd")
        //   }

        // });

    })

    var banChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
    if (!banChannel) return message.reply("Kan het log kanaal niet vinden?");

}


module.exports.help = {
    name: "ban"
}
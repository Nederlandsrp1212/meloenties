const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !kick @spelernaam redenen

    var args = message.content.slice(prefix.length).split(/ +/);

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Helaas kan jij dit niet doen!");

    if (!message.guild.me.hasPermissions("MANAGE_MESSAGES")) return message.reply("Geen perms!");

    if (!args[1]) return message.reply("Geen gebruiker meegegeven!");

    if (!args[2]) return message.reply("Geen redenen meegegeven");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2).join(" ");

    if (!kickUser) return message.reply("Gebruik niet gevonden!");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("0000ff")
        .setTitle("Gelieve binnen 30 seconden te reageren!")
        .setDescription(`Wil je ${kickUser} kicken??`);

    var embed = new discord.MessageEmbed()
        .setColor("ff0000")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gekickt:** ${kickUser} (${kickUser.id})
        **Gekickt:** ${message.author}
        **Reden** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✔", "❌"]);

        if (emoji == "✔") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.reply("Er is iets mis gegaan!");
            });

            message.channel.send(embed);

        } else if (emoji === "❌") {

            msg.delete();

            return message.reply("Kick geanuleerd").then(m => m.delete(5000));

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

    }).cache(err => {
        message.channel.send("Er is iets mis gegaan!");
    });

}

module.exports.help = {
    name: "kick"
}
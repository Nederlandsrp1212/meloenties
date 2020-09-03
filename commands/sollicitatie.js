const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "751092611401515058";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var reportBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            reportBestaat = true;

            message.reply("Je hebt al een sollicitatie openstaan");

            return;
        }

    });

    if (reportBestaat) return;

    var reportEmbed = new discord.MessageEmbed()
        .setTitle("Hallo " + message.author.username)
        .setFooter("Bekijk wat je kan doen!");

    message.channel.send(reportEmbed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true

                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '🔰Staff🔰'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true

                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hallo ${message.author.username} Vul het onderstaande bericht in!`)
                        .setDescription("Doe !politie om voor Politie te solliciteren\nDoe !ambulance om voor Ambulance te solliciteren\nDoe !anwb om voor anwb te solliciteren");

                    settedParent.send(embedParent);

                }
            ).cache(err => {
            message.channel.send("Er is iets mis gegaan!");
            });
        }
    )

}

module.exports.help = {
    name: "sollicitatie"
}
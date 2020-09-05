const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "751092611401515058";

    var userName = message.author.nickName;

    var sollicitatieBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == nickName.toLowerCase() + "-") {
            sollicitatieBestaat = true;

            message.reply("Je hebt al een sollicitatie openstaan!");

            return;
        }

    });

    if (sollicitatieBestaat) return;

    var reportEmbed = new discord.MessageEmbed()
        .setTitle("Hallo " + message.author.nickname)
        .setFooter("Je sollicitatie is aangemaakt!");

    message.channel.send(reportEmbed);

    message.guild.channels.create(nickName.toLowerCase(), { type: 'text' }).then(
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
                        .setTitle(`Hallo ${message.author.username}`)
                        .setDescription("\nWIl je solliciteren voor politie doe dan !politie\nWil je voor ambulance doe dan !ambulance\nWil je voor anwb doe dan !anwb\n\n**Disclaimer**\n*Neem je ontslag of ben je ontslagen? Dan moet je één week wachten voordat je bij een andere whitelisted job kan solliciteren.*");

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
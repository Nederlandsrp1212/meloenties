const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "751092611401515058";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var sollicitatieBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            sollicitatieBestaat = true;

            message.reply("Je hebt al een politie sollicitatie openstaan");

            return;
        }

    });

    if (sollicitatieBestaat) return;

    var reportEmbed = new discord.MessageEmbed()
        .setTitle("Hallo " + message.author.username)
        .setFooter("Je sollicitatie is aangemaakt!");

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

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'KorpsChef⭐⭐⭐'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true

                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Korpsleiding⭐⭐'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true

                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Hoofd-Commissaris⭐'), {
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
                        .setDescription("\nDiscord Naam+Tagg:\nNaam in-game:\nWat is je leeftijd(irl):\nHeb je al ervaring(Ja/Nee):Waarom wil je werken bij deze baan:\nWaarom moeten wij jou aannemen:\nWat zijn je sterke punten:\nWat zijn je zwakke punten:\n\n**Disclaimer**\n*Neem je ontslag of ben je ontslagen? Dan moet je één week wachten voordat je bij een andere whitelisted job kan solliciteren.*");

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
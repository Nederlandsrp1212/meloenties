const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "766013073395548160";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var anwbBestaat = false;

    //message.guild.channels.cache.forEach(channel => {

        //if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
        //    anwbBestaat = true;

        //    message.reply("Je hebt al een anwb sollicitatie openstaan");

        //    return;
        //}

    //});

    if (anwbBestaat) return;

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

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '🔰 | Staff'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true

                    });
                    
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '⚡⚡⚡ | Hoofd-ANWB'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    
                    });
                    
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '⚡⚡ | Manager'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '⚡ | Chef Werkplaats'), {
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
                        .setDescription("\nDiscord Naam+Tagg:\nWat is je leeftijd(irl):\nHeb je al ervaring(Ja/Nee):\nWaarom wil je werken bij deze baan:\nWaarom moeten wij jou aannemen:\nWat zijn je sterke punten:\nWat zijn je zwakke punten:\n\n**Disclaimer**\n*Neem je ontslag of ben je ontslagen? Dan moet je één week wachten voordat je bij een andere whitelisted job kan solliciteren.*");

                    settedParent.send(embedParent);

                }
            ).cache(err => {
            message.channel.send("Er is iets mis gegaan!");
            });
        }
    )

}

module.exports.help = {
    name: "anwb"
}
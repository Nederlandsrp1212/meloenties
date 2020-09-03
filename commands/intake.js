const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "749591852361187398";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var intakeBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            intakeBestaat = true;

            message.reply("Je hebt al een intake");

            return;
        }

    });

    if (intakeBestaat) return;

    var intakeEmbed = new discord.MessageEmbed()
        .setTitle("Hallo " + message.author.username)
        .setFooter("Kijk in intake kanaal om te alles in te vullen!");

    message.channel.send(intakeEmbed);

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
                        .setTitle(`Hallo ${message.author.username} vul het onderstaande bericht in!`)
                        .setDescription("Naam(irl):\nVoor+Achternaam(IG):\nHeb je al nagedacht aan een baan in de stad, zoja welke dan?:\nHeb je familie in de stad:\nWat wordt je functie in de stad:");

                    settedParent.send(embedParent);

                }
            ).cache(err => {
            message.channel.send("Er is iets mis gegaan!");
            });
        }
    )

}

module.exports.help = {
    name: "intake"
}
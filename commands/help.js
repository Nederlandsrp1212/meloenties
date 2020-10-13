const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var helpEmbed = new discord.MessageEmbed()
        .setColor("0000ff")
        .setTitle("**Help**")
        .addFields(
            { name: "**!ambulance**", value: "Maak een sollicitatie aan voor Ambulance!"},
            { name: "**!anwb**", value: "Maak een sollicitatie aan voor ANWB"},
            { name: "**!giveaway**", value: "**WORD AAN GEWERKT EN KAN ALLEEN STAFF**"},
            { name: "**!giveaway**", value: "**WORD AAN GEWERKT EN KAN ALLEEN STAFF**"},
            { name: "**!giveaway**", value: "**WORD AAN GEWERKT EN KAN ALLEEN STAFF**"},
            { name: "**!giveaway**", value: "**WORD AAN GEWERKT EN KAN ALLEEN STAFF**"},
            { name: "**!hallo**", value: "Praat met De discord bot gaat."},
            { name: "**!hgh**", value: "Vraag hoe het gaat aan De discord bot gaat."},
            { name: "**!og**", value: "Zeg hoe het met jou is."},
            { name: "**!help**", value: "Krijg een bericht te zien met alle commando's die je kan uitvoeren."},
            { name: "**!info**", value: "krijg informatie over De discord bot."},
            { name: "**!serverinfo**", value: "Krijg informatie over de server."},
            { name: "**!review**", value: "Geef een review aan de stad."},
            { name: "**!report**", value: "Maak een report aan als iemand iets tegen de regels doet van de server"},
            { name: "**!ticket**", value: "Praat in een bericht met Admin's over dingen."}
        )
    //.setDescription("Heb je nog vragen doe dan !ticket en vraag dan je vraag!");

    return message.channel.send(helpEmbed);

}
module.exports.help = {
    name: "help"
}
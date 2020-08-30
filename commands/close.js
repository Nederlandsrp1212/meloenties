const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send(`Om een **TICKET** te sluiten doe je !closeticket \nOm een **REPORT** te sluiten doe je !closereport \nOm een **INTAKE** te sluiten doe je !closeintake`);

}

module.exports.help = {
    name: "close"
}
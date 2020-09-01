const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var intakeRole = message.guild.roles.cache.get('749989325122437130');
    if (!intakeRole) return message.channel.send("De rol muted bestaat niet!");
    
    await (intakePerson.roles.add(intakeRole.id));
    message.channel.send(`${intakePerson} is gemuted dus kan niet meer praten!`);

}

module.exports.help = {
    name: "testje"
}
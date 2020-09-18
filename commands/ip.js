const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("**Hoe kan je de server joinen?** \n\nJe kan de server joinen door game.luxorycityrp.ga in te voeren bij direct connect, \nOf door F8 connect game.luxorycityrp.ga in te voeren");

}

module.exports.help = {
    name: "ip"
}
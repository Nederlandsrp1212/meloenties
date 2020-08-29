const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("**Hoe kan je de server joinen?** \n\nJe kan de server joinen door 185.227.242.66 in te voeren bij direct connect, \nOf door F8 connect 185.227.242.66 in te voeren");

}

module.exports.help = {
    name: "ip"
}
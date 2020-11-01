const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/level.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        client.commands.set(fileGet.help.name, fileGet);

    });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('772588046897512449');

    if (!role) return

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('772587810217394189');

    if (!channel) return;

    channel.send(`Welkom in de stad ${member} wij wensen u een fijn leven toe!`);

})

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity("!help", { type: "PLAYING" });
});

client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "Geen tekst te vinden!";

    var respone = `Bericht ${messageDeleted.id} is verwijderd uit ${messageDeleted.channel}\n **Bericht:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.id} ${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(respone)
        .setTimestamp()
        .setColor("#FF0000");

    client.channels.cache.find(c => c.name == "logs").send(embed);

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    RandomXP(message);

    if (!message.content.startsWith(prefix)) return;

    //command handler 

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});

function RandomXP(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;

    var idUser = message.author.id;

    if (!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var nextLevelXp = levelUser * 600;

    if (nextLevelXp == 0) nextLevelXp = 100;

    if (xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        fs.writeFile("./data/level.json", JSON.stringify(levelFile), err => {
            if (err) console.log(err);
        });

    }

}
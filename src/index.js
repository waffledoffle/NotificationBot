require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


client.on('messageCreate', (m) => {
    if (m.author.bot) {
        return;
    }
    if (m.content == 'hello') {
        m.reply("Shut up nerd talking to yourself");
    };
});

eventHandler(client);

client.login(process.env.TOKEN);
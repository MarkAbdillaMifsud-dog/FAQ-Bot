const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Partials, ChannelType } = require('discord.js');
const { token } = require('./config.json');
const { Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent] ,partials: [Partials.Message,Partials.Channel]});

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or execute property.`);
    }
}

client.on('messageCreate', async msg => {
    if(msg.author.bot) return; //required otherwise bot will spamn replies
    if(msg.channel.type === ChannelType.DM){
        msg.reply('hello');
        return;
    }
}); 


client.on('messageCreate', async msg => {
    if (msg.author.bot) return; //required otherwise bot will spamn replies
    if(msg.content.includes('meme')) {
        msg.reply('Memes can unfortunately put our server at risk!');
        msg.reply('Please check out the official subreddit at https://www.reddit.com/r/ConflictofNations/ for memetastic fun!');
    }

    if(msg.content.includes('nickname') || (msg.content.includes('message') && msg.content.includes('deleted'))){
        msg.reply('There are blacklists for both nicknames and content posted within text channels.');
        msg.reply('Certain words and phrases are not appropriate for this server and attempts to get around the filter are not allowed.');
    }

    if(msg.content.includes('language')) {
        msg.reply("Check out our different language channels on the left! If your language  isn't available ingame and we don't have staff to moderate it, we cannot open the language specific channel");
        msg.reply('Remember to go to #faq-and-roles to assign your languages to your server profile.');
    }

    if(msg.content.includes('moderator')) {
        msg.reply('Need assistance? You can tag @Support Staff to report rule breaks in our text channels. It is important not to abuse the tags made available!');
    }

    if(msg.content.includes('bug')) {
        msg.reply('Found a bug? Only use the ingame bug report or email us on support@doradogames.com!');
    }

    if(msg.content.includes('feedback') || msg.content.includes('suggestion')) {
        msg.reply('Use our #feedback channel once you have it unlocked to share your thoughts with us. Never ping staff members to provide suggestions or feedback.');
        msg.reply('You can also discuss your feedback on our Forums. More info here: https://forum.conflictnations.com/index.php?board/6-suggestions/!');
    }

    /* TODO:
    - Set up a reply for specific keywords for each question in the Discord CoN FAQ [DONE]
    - We can then consider extending this to general stuff found on the wiki
    - Solution for later: See if we can refer to stuff in a text file so remove hardcoding from the bot code itself
    */
});



client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(token);
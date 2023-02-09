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
        if(msg.content.includes('verification') || msg.content.includes("can't type")) {
            msg.reply('Follow all the instructions when joining the CoN Server and look out for a DM from the Double Counter bot! Click the link you get to verify your account');
        }
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
    // FROM FAQ SHEET

    if(msg.content.includes('SC') || msg.content.includes('Security Council')) {
        msg.reply('Security Council access is the way to get exclusive benefits in Conflict of Nations!');
        msg.reply('Find out more over here: https://wiki.conflictnations.com/Membership');
    }
    
    if(msg.content.includes('firing mode') || msg.content.includes('Security Council')) {
        msg.reply('Firing modes are available only for Security Council subscribers and are available for ranged units');
        msg.reply('Click on the unit and set up the firing mode by clicking on the button for that mode. The default behaviour is always aggressive!');
    }

    if(msg.content.includes('ban')) {
        msg.reply('Did you get banned in the game? Send an email on support@doradogames.com to appeal, but only if you are deemed worthy enough!');
    }

    if(msg.content.includes('bug')) {
        msg.reply('Found a bug? The CMs would love to hear from you. Send a bug report using the bug report button on desktop while in a map.');
        msg.reply('If you are on mobile, use the support button while in a game, but this is only available if you have made at least one purchase in the game.');
        msg.reply('Otherwise, remember we have an email on support@doradogames.com. If you are using this, make sure to include all your game information in the email!');
    }

    if(msg.content.includes('leader')) {
        msg.reply('Want to be an alliance leader on the server? Message Support Staff and provide your ingame name and your alliance name!');
    }

    if(msg.content.includes('private')) {
        msg.reply('Private games are not allowed in Conflict of Nations! Please check out the public games available or look for an alliance :)');
    }

    if((msg.content.includes('CM') || msg.content.includes('Community Manager')) && (msg.content.includes('best') || msg.content.includes('great'))){
        msg.reply('We have some great CMs in Conflict of Nations!');
        msg.reply('Yak is the guru and has made the community what it is today');
        msg.reply('Maxim is the patient one, always doing his best to make the community great and support alliances!');
        msg.reply('Atomio is kind and quiet, but a force behind the scenes!');
        msg.reply('Aquela is also a CM.');
    }

    if(msg.content.includes('resources') && msg.content.includes('more')) {
        msg.reply('Resources can be obtained either by using the ingame market to trade with ingame cash, or by using gold to purcahse resource packs!');
    }

    if (msg.content.includes('name change')) {
        msg.reply('Username changes must be done in the mobile app');
        msg.reply('First, go to the main menu, where you can enter your games, or play new games!');
        msg.reply('Secondly, select the more button at the bottom right corner');
        msg.reply('Select the Account option and from here you can update your Player Name');
        msg.reply('Remember to save afterwards so the change takes place! Remember you can only do this once on your account!');
    }

    if(msg.content.includes('stack')) {
        msg.reply('To stack units, make sure that you move the units to the same spot on the map. They will merge into one stack automatically!');
    }

    if((msg.content.includes('capture') || msg.content.includes('conquer')) && (msg.content.includes('city') || msg.content.includes('province') || msg.content.includes('city') || msg.content.includes('land'))) {
        msg.reply('Only infantry units, with the exception of Special Forces, can conquer land');
    }

    if(msg.content.includes('rogue') || msg.content.includes('insurgent')) {
        msg.reply('Oh no! Not those insurgents again! When your morale becomes dangerously low, there is a chance that insurgents will spawn in your cities which have low morale!');
        msg.reply('Always keep units stationed in cities with morale under 35% to fend off any possible civilian incursions!');
    }

    if((msg.content.includes('hp') || msg.content.includes('health')) && (msg.content.includes('move') || msg.content.includes('moving'))) {
        msg.reply('Your units only lose hp when moving if you are using the rush command, or if you are using naval units in high seas that operate best in coastal waters, like the corvette');
    }
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
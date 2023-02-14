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
        msg.reply('Yak is the guru and has made the community what it is today through sheer force of will and perserverence!');
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

    if(msg.content.includes('coalition')) {
        msg.reply('Coalitions are ingame teams that work together towards a shared VP amount to win the map!');
        msg.reply('To join a coalition, find one that you like and apply is there are enough free spaces available. Keep the wolfpacking rule in mind throughout to keep to a fair battlefield :slight_smile:');
    }

    if(msg.content.includes('insurgent') && msg.content.includes('alliance')) {
        msg.reply('Get ready to have your mind blown! Insurgents actually do not really appear in alliance games, however in some rare instances, you can still encounter them!');
        msg.reply('Due to some shared code magic with other Bytro games, cities can actually rebel and declare themselves for another country. When this happens, the rebelling city goes to one of your alliance teammates!');
    }

    if(msg.content.includes('rush')) {
        msg.reply('Looking to rush your troops? That is a good way to get somewhere faster. While using rush your HP gradually decreases however so be careful. You do not want your soldiers dying from exhaustion.');
    }

    if(msg.content.includes('entrenchment')) {
        msg.reply('Units are entrenched when they are stationed in a friendly city, or a friendly province that has Barracks constructed. This provides a big bonus to their defence, making it harder for the enemy to kill your troops!');
        msg.reply('Barracks and Underground Bunkers all provide increases to your entrenchment!');
    }

    if(msg.content.includes('resource trading')) {
        msg.reply('CoN does not allow for resource trading. You must use the market to buy or sell goods. Direct trading is only available in alliance matches with your own teammates.');
    }

    if((msg.content.includes('NG') || msg.content.includes('national guard')) && (msg.content.includes('hp')) || msg.content.includes('health')) {
        msg.reply("National Guard's spawn hp is dependent on the morale of the city it mobilized in, the unit can be healed fully afterwards");
    }

    if(msg.content.includes('ship') && msg.content.includes('heal')) {
        msg.reply('Ships heal in any coastal waters at the rate of 2hp/day/unit, this rate cannot be changed by any buildings.');
    }

    if(msg.content.includes('low') && msg.content.includes('morale')) {
        msg.reply('If your citizens are angry at you, might be good to check your civilian casualties and the number of wars you are involved in. Praying at the Church of Road is also a good alternative');
    }

    if((msg.content.includes('ally') || msg.content.includes('allied')) && (msg.content.includes('hospital') || msg.content.includes('heal'))) {
        msg.reply('Allied hospitals also allow you to heal your troops. Make sure your troops are insured if you are leaving them in a US hospital though. Their prices are a nightmare!');
    }

    if((msg.content.includes('ally') || msg.content.includes('allied')) && (msg.content.includes('aircraft') || msg.content.includes('carrier'))) {
        msg.reply('Parties on aircraft carriers are not open to allies. You will have to throw your own little carrier parties instead!');
    }

    if((msg.content.includes('aircraft') || msg.content.includes('plane')) && (msg.content.includes('truck') || msg.content.includes('vehicle'))) {
        msg.reply('When an airfield/base the plane is grounded at, gets destroyed or no longer remains friendly, the aircraft will turn into a transport truck, the truck can only travel over land. To get your aircraft back, rebuild the airfield/base, or take it to an existing friendly base');
    }

    if(msg.content.includes('coalition') && msg.content.includes('flag')) {
        msg.reply('No. Dorado artists have instead created a bunch of flags to choose from :slight_smile:. Use those. Do not make the artists sad');
    }

    if(msg.content.includes('elite unit') || msg.content.includes('season')) {
        msg.reply('We have a huge info dump at this link for all your elite unit/season questions: https://wiki.conflictnations.com/Seasons');
    }

    if((msg.content.includes('aircraft') || msg.content.includes('plane')) && (msg.content.includes('return') || msg.content.includes('base'))) {
        msg.reply('A recent update introduced a refuel timer while planes are patrolling in the air. Once the timer ends they must return to base to refuel. The timer startds from the moment the planes leaves its airport');
    }

    if(msg.content.includes('resource') && msg.content.includes('city')) {
        msg.reply('Each city produces one main resource together with Manpower and Cash. The icon next to the name of the city indicates the resource of that city');
    }

    if(msg.content.includes('anti-air')) {
        msg.reply('AAs attack enemy units that get in range. Keep in mind AAs also have to reload after every hit. More on Field of View here: https://wiki.conflictnations.com/Field_of_View');
    }

    if(msg.content.includes('spy') || msg.content.includes('spies')) {
        msg.reply('Spies are a valuable resource in the game and can turn the tide of battle. Make sure you know how to defend against them.');
        msg.reply('Make sure to recruit agents to stay in your cities. The more agents you have in a city, the better chances of capturing enemy spies!');
    }

    if(msg.content.includes('doctrine')) {
        msg.reply('CoN has 3 research doctrines, which determine the units a country can research earlier than others, and units which are made available later in the game.');
        msg.reply('Here is a handy list for you: https://wiki.conflictnations.com/Research');
    }

    if(msg.content.includes('airlift') || msg.content.includes('air travel')) {
        msg.reply('Units with the necessary ability can travel between airports directly as long as they are in range. Always check your unit card');
    }

    if(msg.content.includes('disembark') && msg.content.includes('damage')) {
        msg.reply('The general rule of thumb is it depends on how the unit looks like, if it looks like a ship, it will take ship damage, if it looks like a ground unit, it will take ground unit damage');
    }

    if(msg.content.includes('insurgent') && (msg.content.includes('victory') || msg.content.includes('win'))) {
        msg.reply('Correct. Insurgents can in fact win a map if they get enough VPs. Be ready!');
    }

    if(msg.content.includes('uav') && msg.content.includes('war')) {
        msg.reply("No, a UAV will not declare war when flying over a neutral nation. However it may be visible to the other nation if it's not stealth, no sneaking a peek if your UAV is lower than lvl 6");
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
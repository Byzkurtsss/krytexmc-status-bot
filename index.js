const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const mc = require('minecraft-server-util');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const IP = "mc.hypixel.net";
const PORT = 25565;

client.once('ready', () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  setInterval(async () => {
    try {
      const status = await mc.status(IP, PORT);
      client.user.setActivity(`Oyuncu: ${status.players.online}`, { type: ActivityType.Watching });
    } catch {
      client.user.setActivity(`Sunucu Kapalı`, { type: ActivityType.Watching });
    }
  }, 30000);
});

client.login(process.env.TOKEN);

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const mc = require('minecraft-server-util');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const IP = "mc.hypixel.net";
const PORT = 25565;
const CHANNEL_ID = "KANAL_ID_BURAYA";

let messageId = null;

client.once('ready', async () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  setInterval(async () => {
    try {
      const status = await mc.status(IP, PORT);

      const embed = new EmbedBuilder()
        .setTitle("KrytexMC Sunucu Durumu")
        .addFields(
          { name: "Sunucu", value: "Açık", inline: true },
          { name: "Oyuncular", value: `${status.players.online}/${status.players.max}`, inline: true },
          { name: "IP", value: IP }
        )
        .setTimestamp();

      if (!messageId) {
        const msg = await channel.send({ embeds: [embed] });
        messageId = msg.id;
      } else {
        const msg = await channel.messages.fetch(messageId);
        await msg.edit({ embeds: [embed] });
      }
    } catch (e) {
      const embed = new EmbedBuilder()
        .setTitle("KrytexMC Sunucu Durumu")
        .addFields({ name: "Sunucu", value: "Kapalı" })
        .setTimestamp();

      if (messageId) {
        const msg = await channel.messages.fetch(messageId);
        await msg.edit({ embeds: [embed] });
      }
    }
  }, 30000);
});

client.login(process.env.TOKEN);

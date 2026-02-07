const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const mc = require('minecraft-server-util');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const IP = "mc.hypixel.net";
const PORT = 25565;
const CHANNEL_ID = "1469785789247389953";

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

      // Son 10 mesajda botun attığını bul
      const messages = await channel.messages.fetch({ limit: 10 });
      const botMsg = messages.find(m => m.author.id === client.user.id);

      if (botMsg) {
        await botMsg.edit({ embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }

    } catch (e) {
      const embed = new EmbedBuilder()
        .setTitle("KrytexMC Sunucu Durumu")
        .addFields({ name: "Sunucu", value: "Kapalı" })
        .setTimestamp();

      const messages = await channel.messages.fetch({ limit: 10 });
      const botMsg = messages.find(m => m.author.id === client.user.id);

      if (botMsg) {
        await botMsg.edit({ embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }
    }
  }, 30000);
});

client.login(process.env.TOKEN);

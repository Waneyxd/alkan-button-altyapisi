const { Discord, MessageEmbed ,Client } = require('discord.js');
const client = new Client();
const { MessageButton } = require('discord-buttons')(client);
const moment = require('moment');
const cfg = require('./ayarlar.json');

client.on('ready', async => {
  client.user.setPresence({ activity: { name: "KENDİİSMİNİZ ❤️ SUNUCUNUZUNİSMİ" }, status: "dnd" });
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  let BotSesKanalı = client.channels.cache.get(cfg.bot.botSesKanal);
  if (BotSesKanalı) BotSesKanalı.join().catch(err => console.error("Bot Ses Kanalına Bağlanamadı!"));
})

client.on("message", (message) => {
    if (message.content !== "!etkinlikler") return;
    if (message.author.id === cfg.bot.BotOwner) return;
    if (message.author.bot) return;
// V/K
let Vk = new MessageButton()
  .setStyle('red')
  .setLabel('V/K')
  .setID('V/K'); // Elleme Bunu

// D/C
let Dc = new MessageButton()
  .setStyle('green')
  .setLabel('D/C')
  .setID('D/C'); // Elleme Bunu

// GARTIC.IO


//--------------------------------\\

let KapsentEmbed = new MessageEmbed()
.setAuthor("KENDİİSMİNİZ ❤️ SUNUCUNUZUNİSMİ")
.setColor("RANDOM")
.setDescription(`
<a:sad:849373800381939733> **Selam, Sunucumuzdaki "Eğlence" Rollerini Almak İçin Butonlara Tıklamanız Yeterlidir.**

**__ROLLER__**;

\`>\` <@&${cfg.roles.vkrole}>
\`>\` <@&${cfg.roles.dc}>
`)
.setFooter(`KENDİİSMİNİZ ❤️ SUNUCUNUZUNİSMİ`)
.setTimestamp()
message.channel.send({ buttons: 
  [
    Vk, 
    Dc, 
    
  ], 
  embed: KapsentEmbed 
});

});

client.on('clickButton', async (button) => {
  // V/K
    if (button.id === 'V/K') {
        if (button.clicker.member.roles.cache.get(cfg.roles.vkrole)) {
            await button.clicker.member.roles.remove(cfg.roles.vkrole)
            await button.think(true);
            await button.reply.edit("V/K Rolü Üzerinizden Alındı!")
        } else {
            await button.clicker.member.roles.add(cfg.roles.vkrole)
            await button.think(true);
            await button.reply.edit("V/K Rolü Üzerinize Verildi!")
        }
    }

  // D/C
    if (button.id === 'D/C') {
        if (button.clicker.member.roles.cache.get(cfg.roles.dc)) {
            await button.clicker.member.roles.remove(cfg.roles.dc)
            await button.think(true);
            await button.reply.edit(`D/C Rolü Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add(cfg.roles.dc)
            await button.think(true);
            await button.reply.edit(`D/C Rolü Üzerinize Verildi!`)
        }

    }

});


client.login(cfg.bot.token);

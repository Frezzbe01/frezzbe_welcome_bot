const { Client } = require("discord.js");
const { channels, staffRoles, unregisterRoles, frezzbeunregisterSound, frezzbestaffSound, tokens } = require("./settings.json");   //Created By. Frezzbe (Frezzbe#3130)

 tokens.forEach((token, i) => {
  const client = new Client();
  let connection;
  client.on("ready", async () => connection = await client.channels.cache.get(channels[i]).join());   //Created By. Frezzbe (Frezzbe#3130)
    
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.channelID && !newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID === newState.channelID) || newState.member.user.bot || newState.channelID !== channels[i]) return;   //Created By. Frezzbe (Frezzbe#3130)
    const hasStaff = newState.channel.members.some((x)=> staffRoles.some((r) => x.roles.cache.has(r)));
    const staffSize = newState.channel.members.filter((x) => staffRoles.some((r) => x.roles.cache.has(r))).size;   //Created By. Frezzbe (Frezzbe#3130)
    const unregisterSize = newState.channel.members.filter((x) => unregisterRoles.some((r) => x.roles.cache.has(r))).size;
    if (!hasStaff && unregisterSize === 1) await connection.play(frezzbeunregisterSound);
    else if (hasStaff && staffSize === 1 && unregisterSize === 1) await connection.play(frezzbestaffSound);   //Created By. Frezzbe (Frezzbe#3130)
  });

  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Developer By Frezzbe" }, status: "idle" }); //Created By. Frezzbe (Frezzbe#3130)
  })
  
  
  client.login(token).then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} | Tokende Hata Var, Token Aktif Edilemedi!`));
});//Created By. Frezzbe (Frezzbe#3130)

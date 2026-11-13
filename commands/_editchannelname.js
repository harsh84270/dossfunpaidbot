/*CMD
  command: /editchannelname
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Channel ka naya naam bhejo.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/


var ADMIN_ID = "8587100887";

if (String(user.telegramid) !== ADMIN_ID) {
  Bot.sendMessage("⛔ Admin only.");
  return;
}

var index = Bot.getProperty("editing_channel_index_" + user.telegramid);
var name = String(message || "").trim();
var channels = Bot.getProperty("my_channel_links", []);

if (!channels[index] || name.length < 2 || name.length > 50) {
  Bot.sendMessage("❌ Invalid channel name.");
  return;
}

channels[index].name = name;

Bot.setProperty("my_channel_links", channels, "json");

Bot.sendMessage("✅ Channel name updated!");
Bot.runCommand("/viewmychannels");


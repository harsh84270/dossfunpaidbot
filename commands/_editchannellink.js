/*CMD
  command: /editchannellink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Channel ka naya Telegram link bhejo.

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
var url = String(message || "").trim();
var channels = Bot.getProperty("my_channel_links", []);

if (!channels[index]) {
  Bot.sendMessage("❌ Channel not found.");
  return;
}

if (
  url.indexOf("https://t.me/") !== 0 &&
  url.indexOf("http://t.me/") !== 0
) {
  Bot.sendMessage("❌ Valid Telegram link bhejo.");
  return;
}

channels[index].url = url;

Bot.setProperty("my_channel_links", channels, "json");

Bot.sendMessage("✅ Channel link updated!");
Bot.runCommand("/viewmychannels");


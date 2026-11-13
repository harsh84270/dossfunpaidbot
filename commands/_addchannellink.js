/*CMD
  command: /addchannellink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
Ab apne Telegram channel ka link bhejo.
Example: https://t.me/YourChannel
  ANSWER

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

var name = User.getProperty("new_channel_name");
var url = String(message || "").trim();

if (!name) {
  Bot.sendMessage("❌ Channel name nahi mila. Dobara Add Channel karo.");
  return;
}

if (
  url.indexOf("https://t.me/") !== 0 &&
  url.indexOf("http://t.me/") !== 0
) {
  Bot.sendMessage("❌ Valid Telegram link bhejo, jaise https://t.me/YourChannel");
  return;
}

var channels = Bot.getProperty("my_channel_links", []);

if (!Array.isArray(channels)) {
  channels = [];
}

channels.push({
  name: name,
  url: url
});

Bot.setProperty("my_channel_links", channels, "json");

User.setProperty("new_channel_name", "", "string");

Bot.sendMessage(
  "✅ CHANNEL ADDED!\n\n" +
  "📢 Name: " + name +
  "\n🔗 Link: " + url
);

Bot.runCommand("/morechannelsadmin");


/*CMD
  command: /deletechannel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

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

var index = parseInt(params, 10);
var channels = Bot.getProperty("my_channel_links", []);

if (!Array.isArray(channels) || !channels[index]) {
  Bot.sendMessage("❌ Channel not found.");
  return;
}

var deletedName = channels[index].name;

channels.splice(index, 1);

Bot.setProperty("my_channel_links", channels, "json");

Bot.sendMessage(
  "🗑️ Channel deleted successfully!\n\n" +
  "📢 " + deletedName
);

Bot.runCommand("/morechannelsadmin");


/*CMD
  command: /addchannelname
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
Apne Telegram channel ka naam bhejo.

Example: 📢 My Official Channel
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

var name = String(message || "").trim();

if (name.length < 2 || name.length > 50) {
  Bot.sendMessage("❌ Channel name 2 se 50 characters ka hona chahiye.");
  return;
}

User.setProperty("new_channel_name", name, "string");

Bot.sendMessage(
  "✅ Channel name saved: " + name +
  "\n\nAb channel ka Telegram link bhejo."
);

Bot.runCommand("/addchannellink");


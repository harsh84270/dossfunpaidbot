/*CMD
  command: /broadcastcaption
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Ab apne broadcast ka text/caption bhejo.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var ADMIN_ID = "8587100887";

if (String(user.telegramid) !== ADMIN_ID) return;

var caption = String(message || "").trim();

if (!caption) {
  Bot.sendMessage("❌ Caption bhejo.");
  Bot.runCommand("/broadcastcaption");
  return;
}

User.setProperty("broadcast_caption", caption, "string");
User.setProperty("broadcast_stage", "link", "string");

Bot.runCommand("/broadcasturl");

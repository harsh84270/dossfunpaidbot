/*CMD
  command: /broadcast
  help: 
  need_reply: false
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

User.setProperty("broadcast_stage", "photo", "string");
User.setProperty("broadcast_photo", "", "string");
User.setProperty("broadcast_caption", "", "string");

Bot.runCommand("/broadcastphoto");

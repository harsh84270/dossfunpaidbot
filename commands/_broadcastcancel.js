/*CMD
  command: /broadcastcancel
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

Bot.setProperty("broadcast_draft_photo", "", "string");
Bot.setProperty("broadcast_draft_caption", "", "string");
Bot.setProperty("broadcast_draft_link", "", "string");

User.setProperty("broadcast_photo", "", "string");
User.setProperty("broadcast_caption", "", "string");
User.setProperty("broadcast_stage", "", "string");

Bot.sendMessage("❌ Broadcast cancelled. Kisi user ko message nahi bheja gaya.");

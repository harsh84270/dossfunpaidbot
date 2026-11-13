/*CMD
  command: /broadcastphoto
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Send your broadcast photo with caption.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var ADMIN_ID = "8587100887";

if (String(user.telegramid) !== ADMIN_ID) return;

if (!request.photo || request.photo.length === 0) {
  Bot.sendMessage("❌ Photo bhejo, document nahi.");
  Bot.runCommand("/broadcastphoto");
  return;
}

var photos = request.photo;
var photoId = photos[photos.length - 1].file_id;

User.setProperty("broadcast_photo", photoId, "string");
User.setProperty("broadcast_stage", "caption", "string");

Bot.runCommand("/broadcastcaption");

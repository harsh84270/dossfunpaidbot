/*CMD
  command: /indiaqr
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 🇮🇳 Apni UPI QR code image Gallery se bhejo.

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

if (!request.photo || request.photo.length === 0) {
  Bot.sendMessage("❌ Please send a QR image.");
  return;
}

var photos = request.photo;
var photo = photos[photos.length - 1].file_id;

Bot.setProperty("india_payment_qr", photo, "string");

Bot.sendMessage(
  "✅ India QR Code Saved Successfully!\n\n" +
  "🇮🇳 Your UPI QR is ready for payments."
);


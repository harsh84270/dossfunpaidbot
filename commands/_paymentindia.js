/*CMD
  command: /paymentindia
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

🇮🇳 Enter your India UPI ID (Example: yourname@upi)
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

var upi = message.trim();

if (upi.length < 5 || upi.indexOf("@") === -1) {
  Bot.sendMessage("❌ Invalid UPI ID. Please enter a valid UPI ID.");
  return;
}

Bot.setProperty("india_payment_upi", upi, "string");

Bot.sendMessage(
  "✅ INDIA UPI SAVED!\n\n" +
  "🇮🇳 UPI ID: " + upi
);


/*CMD
  command: /paymentinternational
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 🌍 Enter your International payment details (PayPal, Wise, Binance Pay, etc.).

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

var details = message.trim();

if (details.length < 5 || details.length > 1000) {
  Bot.sendMessage("❌ Please enter valid payment details.");
  return;
}

Bot.setProperty(
  "international_payment_details",
  details,
  "string"
);

Bot.sendMessage(
  "✅ International Payment Details Saved!\n\n" +
  "🌍 Your payment instructions are ready."
);


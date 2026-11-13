/*CMD
  command: /paymentsettings
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

var buttons = [
  [{ title: "🇮🇳 India UPI Settings", command: "/paymentindia" }],
  [{ title: "📷 Upload India QR Code", command: "/indiaqr" }],
  [{ title: "🌍 International Payment Settings", command: "/paymentinternational" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "💳 PAYMENT SETTINGS\n\nSelect an option:"
);


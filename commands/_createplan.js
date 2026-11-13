/*CMD
  command: /createplan
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
  [{ title: "🇮🇳 Create India Plan (INR)", command: "/createplanindia" }],
  [{ title: "🌍 Create International Plan (USD)", command: "/createplaninternational" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "➕ CREATE NEW PLAN\n\n" +
  "Select the region for this plan:\n\n" +
  "🇮🇳 India — Price in ₹\n" +
  "🌍 International — Price in $"
);


/*CMD
  command: /categorymanager
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
  [{ title: "🇮🇳 India Categories", command: "/categoryregion india" }],
  [{ title: "🌍 International Categories", command: "/categoryregion international" }],
  [{ title: "⬅️ Back to Dashboard", command: "/mainmenu" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📂 CATEGORY MANAGER\n\nSelect region to manage categories:"
);


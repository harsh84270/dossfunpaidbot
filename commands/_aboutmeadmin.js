/*CMD
  command: /aboutmeadmin
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
  [{ title: "✏️ Add / Update About Me", command: "/setaboutme" }],
  [{ title: "👁️ Preview About Me", command: "/aboutme" }],
  [{ title: "⬅️ Back to Dashboard", command: "/mainmenu" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "😊 ABOUT ME SETTINGS\n\n" +
  "Yahan se apni public profile information manage karo."
);


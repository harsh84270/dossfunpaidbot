/*CMD
  command: /groupaccesschoice
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
  [{ title: "✅ Yes, Group Access", command: "/groupyes" }],
  [{ title: "❌ No Group Access", command: "/groupno" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "👥 GROUP ACCESS SETTING\n\n" +
  "Kya is plan ke saath Telegram group access dena hai?"
);


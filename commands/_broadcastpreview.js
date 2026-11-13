/*CMD
  command: /broadcastpreview
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

var draft = Bot.getProperty("broadcast_draft_text");

if (!draft) {
  Bot.sendMessage("⚠️ Koi broadcast message ready nahi hai. Pehle /broadcasttext use karo.");
  return;
}

var users = Bot.getProperty("broadcast_users", []);

if (!Array.isArray(users)) {
  users = [];
}

var buttons = [
  [{ title: "🚀 Send to All Users", command: "/broadcastsend" }],
  [{ title: "❌ Cancel Broadcast", command: "/broadcastcancel" }],
  [{ title: "⬅️ Back", command: "/broadcast" }]
];

Bot.sendInlineKeyboard(
  buttons,
  "📢 FINAL BROADCAST CONFIRMATION\n\n" +
  "👥 Registered users: " + users.length +
  "\n\n📝 Message:\n\n" + draft +
  "\n\n⚠️ Send dabane par sabhi registered users ko message jayega."
);

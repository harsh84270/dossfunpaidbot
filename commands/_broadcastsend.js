/*CMD
  command: /broadcastsend
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

var photo = Bot.getProperty("broadcast_draft_photo");
var caption = Bot.getProperty("broadcast_draft_caption");
var link = Bot.getProperty("broadcast_draft_link");

if (!photo || !caption || !link) {
  Bot.sendMessage("❌ Broadcast incomplete hai. Dobara /broadcast start karo.");
  return;
}

var users = Bot.getProperty("broadcast_users", []);

if (!Array.isArray(users) || users.length === 0) {
  Bot.sendMessage("⚠️ Koi registered user nahi mila.");
  return;
}

var sent = 0;
var failed = 0;

for (var i = 0; i < users.length; i++) {
  try {
    var result = Api.sendPhoto({
      chat_id: users[i],
      photo: photo,
      caption: caption,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔗 Open Link", url: link }]
        ]
      }
    });

    if (result && result.ok === false) {
      failed++;
    } else {
      sent++;
    }

  } catch (e) {
    failed++;
  }
}

Bot.setProperty("broadcast_draft_photo", "", "string");
Bot.setProperty("broadcast_draft_caption", "", "string");
Bot.setProperty("broadcast_draft_link", "", "string");

Bot.sendMessage(
  "📢 BROADCAST COMPLETE\n\n" +
  "👥 Total Users: " + users.length + "\n" +
  "✅ Successful: " + sent + "\n" +
  "❌ Failed: " + failed
);

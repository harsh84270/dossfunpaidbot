/*CMD
  command: /broadcasturl
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Send your broadcast URL.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var ADMIN_ID = "8587100887";

if (String(user.telegramid) !== ADMIN_ID) return;

var link = String(message || "").trim();

if (link.indexOf("https://") !== 0) {
  Bot.sendMessage("❌ Valid HTTPS URL bhejo.");
  Bot.runCommand("/broadcasturl");
  return;
}

var photo = User.getProperty("broadcast_photo");
var caption = User.getProperty("broadcast_caption");

Bot.setProperty("broadcast_draft_photo", photo, "string");
Bot.setProperty("broadcast_draft_caption", caption, "string");
Bot.setProperty("broadcast_draft_link", link, "string");

User.setProperty("broadcast_stage", "", "string");

Api.sendPhoto({
  chat_id: user.telegramid,
  photo: photo,
  caption: caption,
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔗 Open Link", url: link }]
    ]
  }
});

Bot.sendInlineKeyboard(
  [
    [{ title: "🚀 Confirm & Send", command: "/broadcastsend" }],
    [{ title: "❌ Cancel", command: "/broadcastcancel" }]
  ],
  "👁️ BROADCAST PREVIEW\n\nPhoto + Caption + Link\n\nSab sahi hai to Confirm dabao."
);

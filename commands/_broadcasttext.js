/*CMD
  command: /broadcasttext
  help: 
  need_reply: true
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

var textMessage = String(message || "").trim();

if (!textMessage || textMessage === "/broadcasttext") {
  Bot.sendMessage(
    "📝 Apna broadcast message bhejo.\n\n" +
    "Example:\n" +
    "🎉 New Premium Plans Available!\n\n" +
    "Hamare naye plans ab available hain. Apna plan aaj hi choose karein."
  );
  return;
}

// Save broadcast draft
Bot.setProperty("broadcast_draft_text", textMessage, "string");
Bot.setProperty("broadcast_draft_type", "text", "string");

var previewButtons = [
  [{ title: "✅ Confirm Preview", command: "/broadcastpreview" }],
  [{ title: "❌ Cancel", command: "/broadcastcancel" }]
];

Bot.sendInlineKeyboard(
  previewButtons,
  "👁️ BROADCAST PREVIEW\n\n" +
  textMessage +
  "\n\n⚠️ Ye sirf preview hai. Abhi kisi user ko message nahi bheja gaya."
);
